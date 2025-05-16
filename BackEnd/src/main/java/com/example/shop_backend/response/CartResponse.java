package com.example.shop_backend.response;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {
    private String productId;
    private String size;
    private int quantity;
    private String color;
    private String image;
    private String name;
    private Long price;
    private boolean flashSale;
    private Long sale;
}
