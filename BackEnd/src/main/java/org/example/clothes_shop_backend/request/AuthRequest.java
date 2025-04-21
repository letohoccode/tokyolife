package org.example.clothes_shop_backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class AuthRequest {

    @NotNull(message = "Password Not Null")
    @NotBlank(message = "Password not Blank")
    @NotEmpty(message = "Password Not Null")
    private String email;

    @NotNull(message = "Password Not Null")
    @NotBlank(message = "Password not Blank")
    @NotEmpty(message = "Password Not Null")
    private String password;
}
