package org.example.clothes_shop_backend.reponse;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@JsonInclude( JsonInclude.Include.NON_EMPTY)
public class AuthResponse {
    private String token;
    private String fullName;
    private String email;
    private String error;
}
