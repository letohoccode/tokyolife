package com.example.shop_backend.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderItemRequest {
    private String productId;
    private String color;
    private String size;
    private Long quantity;
}
