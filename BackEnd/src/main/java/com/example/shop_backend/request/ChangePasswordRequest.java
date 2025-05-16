package com.example.shop_backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChangePasswordRequest {
    @NotNull(message = "Email is not Null")
    @NotBlank(message = "Email is not blank")
    @Size(min = 5,message = "Email is 5 Character")
    private String email;
    @NotNull(message = "password is not Null")
    @NotBlank(message = "password is not blank")
    @Size(min = 5,message = "password is 5 Character")
    private String password;
    @NotNull(message = "changePassword is not Null")
    @NotBlank(message = "changePassword is not blank")
    @Size(min = 5,message = "changePassword is 5 Character")
    private String changePassword;
}
