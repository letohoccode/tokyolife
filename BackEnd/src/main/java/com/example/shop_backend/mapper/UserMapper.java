package com.example.shop_backend.mapper;

import com.example.shop_backend.entity.Address;
import com.example.shop_backend.entity.User;
import com.example.shop_backend.response.AuthResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Service
@Slf4j
public class UserMapper {

    public static AuthResponse UserResponse(User user)
    {
        AuthResponse authResponse;
        Address address= user.getAddress();
        log.info("address",address);
        if(address != null)
        {
             authResponse = AuthResponse.builder()
                    .id(user.getId())
                    .phone(user.getPhone())
                    .fullName(user.getFullName())
                    .email(user.getEmail())
                    .images(user.getImages())
                    .role(String.valueOf(user.getRoles()))
                    .addresses(new AddressMapper(user.getAddress()))
                    .blocked(user.isBlocked())
                    .build();
        }
        authResponse = AuthResponse.builder()
                .id(user.getId())
                .phone(user.getPhone())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .images(user.getImages())
                .role(String.valueOf(user.getRoles()))
                .blocked(user.isBlocked())
                .build();
        return authResponse;
    }
    public static AuthResponse UserAndAddress(User user)
    {
        return AuthResponse.builder()
                .id(user.getId())
                .phone(user.getPhone())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .images(user.getImages())
                .role(String.valueOf(user.getRoles()))
                .addresses(new AddressMapper(user.getAddress()))
                .build();
    }
}
