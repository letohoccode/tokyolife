package com.example.shop_backend.controllerService;

import com.example.shop_backend.entity.Token;
import com.example.shop_backend.entity.User;
import com.example.shop_backend.mail.EmailService;
import com.example.shop_backend.mail.EmailTemplate;
import com.example.shop_backend.mapper.UserMapper;
import com.example.shop_backend.request.AuthRequest;
import com.example.shop_backend.request.ChangePasswordRequest;
import com.example.shop_backend.request.RegisterRequest;
import com.example.shop_backend.response.AuthResponse;
import com.example.shop_backend.response.DataResponse;
import com.example.shop_backend.response.RegisterResponse;
import com.example.shop_backend.utilsEnum.UserRoles;
import com.example.shop_backend.service.TokenService;
import com.example.shop_backend.service.UserService;
import com.example.shop_backend.serviceImpl.JwtServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthControllerService {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtServiceImpl jwtService;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public DataResponse<AuthResponse> AuthenticationResponse(AuthRequest request) {
        User user = userService.findByEmail(request.getEmail());
        if(user == null)
            return DataResponse.<AuthResponse>builder()
                    .message("Email không tồn tại")
                    .code(201)
                    .build();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token = jwtService.generateToken(user);
        return DataResponse.<AuthResponse>builder()
                .message("Dang Nhap Thanh Cong")
                .token(token)
                .data(UserMapper.UserResponse(user))
                .build();
    }

    public DataResponse<RegisterResponse> RegisterResponse(RegisterRequest request) throws MessagingException {
        User Saveuser = userService.findByEmail(request.getEmail());
        if(Saveuser != null)
        {
            return DataResponse.<RegisterResponse>builder()
                    .message("Email Đã Được Đăng Ký")
                    .code(201)
                    .build();
        }


        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setEnable(false);
        user.setBlocked(true);
        user.setRoles(UserRoles.USER);

        User user1 =  userService.saveUser(user);
        senValidationEmail(user1,"Account Activation");
        return DataResponse.<RegisterResponse>builder()
                .message("Dang ky thanh cong")
                .code(200)
                .build();
    }

    private void senValidationEmail(User user1,String content) throws MessagingException {
        String token = createToken(user1);

        emailService.SendEmail(
                user1.getEmail(),
                user1.getFullName(),
                EmailTemplate.ACCOUNT_ACTIVATE,
                "localhost:4000/confirmCode",
                token,
                content
        );
    }

    private String createToken(User user1) {
        String tokenCode = String.valueOf(new Random().nextInt(100_000,999_999));

        var token = Token.builder()
                .token(tokenCode)
                .createAt(LocalDateTime.now())
                .expiredAt(LocalDateTime.now().plusMinutes(15))
                .user(user1)
                .build();
        tokenService.saveToken(token);
        return tokenCode;
    }

    public DataResponse<RegisterResponse> confirmAccount(String token) throws Exception {
        Token token1 = tokenService.findTokenByToken(token);
        if(token1 == null)
        {
            return DataResponse.<RegisterResponse>builder()
                    .message("Ma Code Khong Dung")
                    .code(201)
                    .build();
        }
        User user = userService.findById(token1.getUser().getId());

        if(LocalDateTime.now().isAfter(token1.getExpiredAt()))
        {
            senValidationEmail(user,"Account Activation");
            throw new RuntimeException("ma code da het han");
        }


        if (user == null)
            return DataResponse.<RegisterResponse>builder()
                    .message("Ma Code Khong Dung")
                    .code(201)
                    .build();
        user.setEnable(true);
        userService.updateUser(user);
        token1.setValidated(LocalDateTime.now());
        tokenService.saveToken(token1);

        return DataResponse.<RegisterResponse>builder()
                .message("Dang Ky Thanh Cong")
                .build();
    }

    public DataResponse<AuthResponse> ChangePassword(@Valid ChangePasswordRequest request) throws MessagingException {
        User user = userService.findByEmail(request.getEmail());
        if (user == null || !passwordEncoder.matches(request.getPassword(),user.getPassword()))
            return DataResponse.<AuthResponse>builder()
                    .message("email hoac mat khau khong dung")
                    .code(201)
                    .build();
        user.setPassword(passwordEncoder.encode(request.getChangePassword()));
        userService.updateUser(user);
        senValidationEmail(user,"Change Password Success");
        return DataResponse.<AuthResponse>builder()
                .message("Thay doi thanh cong")
                .build();
    }

}
