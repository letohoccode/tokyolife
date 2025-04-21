package org.example.clothes_shop_backend.service;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.clothes_shop_backend.email.EnumEmail;
import org.example.clothes_shop_backend.jwt.JWTService;
import org.example.clothes_shop_backend.model.Role;
import org.example.clothes_shop_backend.model.Token;
import org.example.clothes_shop_backend.model.User;
import org.example.clothes_shop_backend.reponse.AuthResponse;
import org.example.clothes_shop_backend.repository.RoleRepository;
import org.example.clothes_shop_backend.repository.TokenRepository;
import org.example.clothes_shop_backend.repository.UserRepository;
import org.example.clothes_shop_backend.request.AuthRequest;
import org.example.clothes_shop_backend.request.RegisterRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

@RequiredArgsConstructor
@Service
public class AuthenticationService {
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final String activateUrl = "http://localhost:8080/activate-account";
    public String register(RegisterRequest request) throws MessagingException
    {
        User username = userRepository.findByEmail(request.getEmail())
                .orElse(null);
        if(username != null)
        {
            return "Account exits";
        }
        Role role = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalArgumentException("Role User not found"));
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .block(false)
                .enable(false)
                .roles(List.of(role))
                .build();
        userRepository.save(user);
        sendValidateEmail(user);
        return "Register Success";
    }

    private void sendValidateEmail(User user) throws MessagingException {

        String token = generateTokenUser(user);
        emailService.senderEmail(
                user.getEmail(),
                user.getFullName(),
                EnumEmail.ACTIVATE_ACCOUNT,
                activateUrl,
                token,
                "Account Validate"
        );

    }

    private String generateTokenUser(User user) {
        String generateToken = randomToken();
        var token = Token.builder()
                .token(generateToken)
                .user(user)
                .createAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();
        tokenRepository.save(token);
        return generateToken;
    }

    private String randomToken()
    {
        Random random = new Random();
        return String.valueOf(random.nextInt(100000,999999)) ;
    }

    public AuthResponse authResponse(AuthRequest request)
    {
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = (User)auth.getPrincipal();
        if(user == null)
        {
            return AuthResponse.builder()
                    .error("Email of password is incorrect")
                    .build();
        }
        String token = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }
    public String activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token).orElseThrow();
        if(LocalDateTime.now().isAfter(savedToken.getExpiresAt()))
        {
            sendValidateEmail(savedToken.getUser());
            throw new RuntimeException("Activation token has expired");
        }
        User user = userRepository.findById(savedToken.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnable(true);

        savedToken.setValidateAt(LocalDateTime.now());
        userRepository.save(user);
        tokenRepository.save(savedToken);
        return "Register Success";
    }

}
