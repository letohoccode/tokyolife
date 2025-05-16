package com.example.shop_backend.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterRequest {
    @NotNull(message = "Full Name is not Null")
    private String fullName;
    @NotNull(message = "Email is not Null")
    @NotBlank(message = "Email is not blank")
    @Size(min = 5,message = "Email is 5 Character")
    private String email;
    @NotNull(message = "Password is not Null")
    @NotBlank(message = "Password is not blank")
    @Size(min = 4,message = "Password is 5 Character")
    private String password;
    @NotNull(message = "Phone is not Null")
    @NotBlank(message = "Phone is not blank")
    @Size(min = 4,message = "Phone is 5 Character")
    private String phone;
}
