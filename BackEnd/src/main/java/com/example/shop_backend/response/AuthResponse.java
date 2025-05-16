package com.example.shop_backend.response;

import com.example.shop_backend.entity.Address;
import com.example.shop_backend.mapper.AddressMapper;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AuthResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String images;
    private String role;
    private boolean blocked;
    private AddressMapper addresses;
}
