package com.example.shop_backend.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ProductRequest {
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
    @Size(min = 1,max = 900000,message = "min 1 and mã 900000")
    private Long price;
    @Size(min = 1,max = 900000,message = "min 1 and mã 900000")
    private Long sale;

    private ProductSizeRequest[] productSizeRequests;
    @NotNull(message = "category not null")
    @NotBlank(message = "category not blank")
    @NotEmpty(message = "category not empty")
    private String category;
    private Long userId;
    private String[] files;

}
