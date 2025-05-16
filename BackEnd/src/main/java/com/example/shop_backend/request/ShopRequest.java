package com.example.shop_backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@Builder
public class ShopRequest {
    @NotNull(message = "name not null")
    @NotBlank(message = "name not blank")
    @NotEmpty(message = "name not empty")
    private String name;

    @NotNull(message = "file not null")
    @NotBlank(message = "file not blank")
    @NotEmpty(message = "file not empty")
    private String file;


    private Long userId;

    @NotNull(message = "street not null")
    @NotBlank(message = "street not blank")
    @NotEmpty(message = "street not empty")
    private String street;

    @NotNull(message = "commune not null")
    @NotBlank(message = "commune not blank")
    @NotEmpty(message = "commune not empty")
    private String commune;

    @NotNull(message = "district not null")
    @NotBlank(message = "district not blank")
    @NotEmpty(message = "district not empty")
    private String district;

    @NotNull(message = "conscious not null")
    @NotBlank(message = "conscious not blank")
    @NotEmpty(message = "conscious not empty")
    private String conscious;

    private String hotline;
}
