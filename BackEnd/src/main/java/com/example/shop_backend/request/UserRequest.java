package com.example.shop_backend.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRequest {
    private String email;

    private String fullName;
    private String images;
    private String phone;
    private String street;
    private String commune;
    private String district;
    private String conscious;

}
