package com.example.shop_backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddressRequest {
    @NotNull(message = "Street is non null")
    @NotBlank(message = "Street is Non Blank")
    private String street;
    @NotNull(message = "Commune is non null")
    @NotBlank(message = "Commune is Non Blank")
    private String commune;
    @NotNull(message = "District is non null")
    @NotBlank(message = "District is Non Blank")
    private String district;
    @NotNull(message = "Conscious is non null")
    @NotBlank(message = "Conscious is Non Blank")
    private String conscious;

}
