package com.example.shop_backend.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class OrderItemResponse {
    private String productId;
    private String name;
    private Long totalPrice;
    private Long quantity;
    private String image;
    private String color;
    private String size;
}
