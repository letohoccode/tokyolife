package com.example.shop_backend.mapper;

import com.example.shop_backend.entity.OrderEntity;
import com.example.shop_backend.entity.OrderItem;
import com.example.shop_backend.entity.ProductEntity;
import com.example.shop_backend.request.OrderItemRequest;
import com.example.shop_backend.response.OrderItemResponse;
import com.example.shop_backend.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.UUID;

@Service
public class OrderItemMapper {
    private final ProductService productService;

    public OrderItemMapper(ProductService productService) {
        this.productService = productService;
    }

    public static OrderItemResponse orderItemResponse(OrderItem orderItem)
    {
        return OrderItemResponse.builder()
                .quantity(orderItem.getQuantity())
                .productId(String.valueOf(orderItem.getProductEntity().getId()))
                .name(orderItem.getName())
                .totalPrice(orderItem.getTotalPrice())
                .image(orderItem.getImage())
                .size(orderItem.getSize())
                .color(orderItem.getColor())
                .build();


    }
    public  OrderItem orderItem(OrderItemRequest request, OrderEntity orderEntity)
    {
        ProductEntity productEntity = productService.findProductById(UUID.fromString(request.getProductId()));
        return OrderItem.builder()
                .size(request.getSize())
                .color(request.getColor())
                .name(productEntity.getProductName())
                .image(productEntity.getImages())
                .quantity(request.getQuantity())
                .totalPrice(request.getQuantity() * productEntity.getPrice())
                .orderEntity(orderEntity)
                .productEntity(productEntity)
                .build();
    }
}
