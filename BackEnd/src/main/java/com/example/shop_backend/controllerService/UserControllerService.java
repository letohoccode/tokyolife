package com.example.shop_backend.controllerService;

import com.example.shop_backend.entity.Address;
import com.example.shop_backend.entity.User;
import com.example.shop_backend.mapper.UserMapper;
import com.example.shop_backend.request.AddressUserRequest;
import com.example.shop_backend.request.RegisterRequest;
import com.example.shop_backend.request.UserRequest;
import com.example.shop_backend.response.AuthResponse;
import com.example.shop_backend.response.DataResponse;
import com.example.shop_backend.service.AddressService;
import com.example.shop_backend.service.UserService;
import com.example.shop_backend.utilsEnum.UserRoles;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserControllerService {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AddressService addressService;

    public DataResponse<AuthResponse> updateAddressUser(@Valid AddressUserRequest request) {
        User user = userService.findByEmail(request.getEmail());
        if (user == null) {
            return DataResponse.<AuthResponse>builder()
                    .message("Không tìm thấy người dùng")
                    .build();
        }
        if (user.getAddress() == null) {
            Address newAddress = Address.builder()
                    .commune(request.getCommune())
                    .district(request.getDistrict())
                    .street(request.getStreet())
                    .conscious(request.getConscious())
                    .build();

            addressService.saveAddress(newAddress);

            user.setAddress(newAddress);
            userService.saveUser(user);

            return DataResponse.<AuthResponse>builder()
                    .message("Thêm địa chỉ mới thành công")
                    .build();
        }

        try {
            Address existingAddress = addressService.findAddressById(user.getAddress().getId());
            if (existingAddress == null) {
                Address newAddress = Address.builder()
                        .commune(request.getCommune())
                        .district(request.getDistrict())
                        .street(request.getStreet())
                        .conscious(request.getConscious())
                        .build();

                addressService.saveAddress(newAddress);
                user.setAddress(newAddress);
                userService.saveUser(user);
                return DataResponse.<AuthResponse>builder()
                        .message("Tạo địa chỉ mới thành công")
                        .build();
            }
            existingAddress.setCommune(request.getCommune());
            existingAddress.setDistrict(request.getDistrict());
            existingAddress.setStreet(request.getStreet());
            existingAddress.setConscious(request.getConscious());
            addressService.saveAddress(existingAddress);
            return DataResponse.<AuthResponse>builder()
                    .message("Cập nhật địa chỉ thành công")
                    .build();
        } catch (Exception e) {
            return DataResponse.<AuthResponse>builder()
                    .message("Lỗi khi cập nhật địa chỉ: " + e.getMessage())
                    .build();
        }

    }


    public DataResponse<List<AuthResponse>> SearchUser(String name) {
        List<User> userList = userService.findUserByKeyword(name);

        if(userList == null)
            return DataResponse.<List<AuthResponse>>builder()
                    .message("Khong co nguoi dung nao")
                    .build();
        List<AuthResponse> authResponses = userList.stream()
                .map(UserMapper::UserResponse)
                .toList();
        return DataResponse.<List<AuthResponse>>builder()
                .message("lay nguoi dung thanh cong")
                .data(authResponses)
                .build();
    }

    public DataResponse<AuthResponse> findUserById(Long userId) {
        User user = userService.findById(userId);
        if(user == null)
            return DataResponse.<AuthResponse>builder()
                    .message("Khong co nguoi dung nao")
                    .build();
        return DataResponse.<AuthResponse>builder()
                .message("Lay nguoi dung thanh cong")
                .data(UserMapper.UserResponse(user))
                .build();
    }

    public DataResponse<String> blockUserId(Long userId) {
        log.info("user Id {}",userId);
        User user = userService.findById(userId);
        if (user == null)
            return DataResponse.<String>builder()
                    .message("lay data khong thanh cong")
                    .build();
        userService.userBlock(!user.isBlocked(), user.getId());
        return DataResponse.<String>builder()
                .message("Block thanh cong")
                .build();
    }

    public DataResponse<List<AuthResponse>> findUserBlock() {
        List<User> userList = userService.findUserBlock();
        List<AuthResponse> authResponses = userList.stream()
                .map(UserMapper::UserResponse)
                .toList();
        return DataResponse.<List<AuthResponse>>builder()
                .message("lay data thanh cong")
                .data(authResponses)
                .build();
    }


    public DataResponse<String> saveUserManager(RegisterRequest request) {
        User user1 = userService.findByEmail(request.getEmail());
        if (user1 != null)
            return DataResponse.<String>builder().message("email da ton tai").build();

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setEnable(true);
        user.setBlocked(true);
        user.setRoles(UserRoles.MANAGER);
        userService.saveUser(user);
        return DataResponse.<String>builder()
                .message("Dang ky thanh cong")
                .build();
    }

    public DataResponse<AuthResponse> getUserAndAddress(Long userId) {
        User user = userService.findById(userId);
        if (user == null)
        {
            return DataResponse.<AuthResponse>builder()
                    .message("Khong tim thay nguoi dung")
                    .build();
        }
        return  DataResponse.<AuthResponse>builder()
                .message("lay nguoi dung thanh cong")
                .code(200)
                .data(UserMapper.UserAndAddress(user))
                .build();
    }

    public DataResponse<String> updateUser(UserRequest request) {
        User user = userService.findByEmail(request.getEmail());
        if (user == null) {
            return DataResponse.<String>builder()
                    .message("Không tồn tại người dùng")
                    .code(400)
                    .build();
        }
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setImages(request.getImages());
        if (user.getAddress() == null) {
            Address newAddress = Address.builder()
                    .street(request.getStreet())
                    .commune(request.getCommune())
                    .district(request.getDistrict())
                    .conscious(request.getConscious())
                    .build();
            addressService.saveAddress(newAddress);
            user.setAddress(newAddress);
        } else {
            Address existingAddress = user.getAddress();
            existingAddress.setStreet(request.getStreet());
            existingAddress.setCommune(request.getCommune());
            existingAddress.setDistrict(request.getDistrict());
            existingAddress.setConscious(request.getConscious());
            addressService.saveAddress(existingAddress);
        }
        userService.saveUser(user);
        return DataResponse.<String>builder()
                .message("Cập nhật thành công")
                .code(200)
                .build();
    }

}
