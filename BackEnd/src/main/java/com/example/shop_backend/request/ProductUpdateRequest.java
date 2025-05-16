package com.example.shop_backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductUpdateRequest {
    @NotNull(message = "Product Name not null")
    @NotBlank(message = "Product Name not blank")
    @NotEmpty(message = "Product name not empty")
    private String productName;
    @NotNull(message = "title Name not null")
    @NotBlank(message = "title Name not blank")
    @NotEmpty(message = "title name not empty")
    private String title;
    @NotNull(message = "described not null")
    @NotBlank(message = "described not blank")
    @NotEmpty(message = "described not empty")
    private String described;
    @NotNull(message = "price not null")
    @NotBlank(message = "price not blank")
    @NotEmpty(message = "price not empty")
    private Long price;
    @NotNull(message = "sale not null")
    @NotBlank(message = "sale not blank")
    @NotEmpty(message = "sale not empty")
    private Long sale;
    @NotNull(message = "category not null")
    @NotBlank(message = "category not blank")
    @NotEmpty(message = "category not empty")
    private String category;
    @NotNull(message = "product id not null")
    @NotBlank(message = "product id not blank")
    @NotEmpty(message = "product id not empty")
    private String id;
}
