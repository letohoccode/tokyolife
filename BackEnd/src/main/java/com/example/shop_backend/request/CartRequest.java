package com.example.shop_backend.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartRequest {
    private Long userId;
    private String productId;
    private String size;
    private String color;
    private int quantity;
    private Long price;
}
