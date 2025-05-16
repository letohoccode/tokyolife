package com.example.shop_backend.mapper;

import com.example.shop_backend.entity.ProductEntity;
import com.example.shop_backend.entity.ProductSize;
import com.example.shop_backend.request.ProductSizeRequest;

public class ProductSizeMapper {
    public static ProductSize productSize(ProductSizeRequest productSizeRequest, ProductEntity product)
    {
        return ProductSize.builder()
                .size(productSizeRequest.getSize())
                .quantity(productSizeRequest.getQuantity())
                .productEntity(product)
                .color(productSizeRequest.getColor())
                .build();
    }
}
