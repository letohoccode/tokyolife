package org.example.clothes_shop_backend.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class RegisterRequest {

    @NotNull(message = "First Name not null")
    @NotEmpty(message = "First Name not null")
    private String firstName;
    @NotEmpty(message = "Last Name not null")
    @NotNull(message = "Last name not null")
    private String lastName;
    @NotEmpty(message = "Phone Number not null")
    @NotNull(message = "Phone Number not null")
    private String phoneNumber;
    @NotNull(message = "Email Number not null")
    @NotEmpty(message = "Email Number not null")
    @NotBlank(message = "Email not blank")
    @Email(message = "Email your")
    private String email;
    @NotNull(message = "Password not null")
    @NotEmpty(message = "Password not null")
    @NotBlank(message = "Password not blank")
    private String password;


}
