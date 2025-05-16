package com.example.shop_backend.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductSizeRequest {
    private String color;
    private String size;
    private Long quantity;
}
