package com.example.shop_backend.mapper;

import com.example.shop_backend.entity.ProductEntity;
import com.example.shop_backend.request.CartRequest;
import com.example.shop_backend.response.CartResponse;

public class CartMapper {

    public static CartResponse cartResponse(CartRequest request, ProductEntity productEntity)
    {
        return CartResponse.builder()
                .color(request.getColor())
                .size(request.getSize())
                .price(request.getPrice())
                .image(productEntity.getImages())
                .name(productEntity.getProductName())
                .sale(productEntity.getSale())
                .flashSale(productEntity.getFlashSale())
                .quantity(request.getQuantity())
                .productId(request.getProductId())
                .build();
    }
}
