package com.example.shop_backend.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class RegisterResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
}
