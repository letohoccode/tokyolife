package com.example.shop_backend.mapper;

import com.example.shop_backend.entity.ImagesEntity;
import com.example.shop_backend.entity.ProductEntity;
import com.example.shop_backend.entity.ProductSize;
import com.example.shop_backend.response.ProductListResponse;
import com.example.shop_backend.response.ProductResponse;
import com.example.shop_backend.response.ProductSizeResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductMapper {
    public ProductListResponse productListResponse(ProductEntity productEntity)
    {

        return ProductListResponse.builder()
                .id(String.valueOf(productEntity.getId()))
                .productName(productEntity.getProductName())
                .image(productEntity.getImages())
                .bought(productEntity.getBought())
                .price(productEntity.getPrice())
                .sale(productEntity.getSale())
                .flashSale(productEntity.getFlashSale())
                .productType(productEntity.getProductType())
                .build();
    }
    public ProductResponse productResponse(ProductEntity productEntity,  List<ProductSize> productSizes, List<ImagesEntity> imagesEntityList)
    {

        List<ProductSizeResponse> productSizeResponses = productSizes.stream()
                .map(product -> ProductSizeResponse.builder()
                        .id(String.valueOf(product.getId()))
                        .size(product.getSize())
                        .color(product.getColor())
                        .quantity(product.getQuantity())
                        .build())
                .toList();
        List<String> images = imagesEntityList.stream()
                .map(ImagesEntity::getImages).toList();
        return ProductResponse.builder()
                .id(String.valueOf(productEntity.getId()))
                .productName(productEntity.getProductName())
                .title(productEntity.getTitle())
                .described(productEntity.getProductName())
                .bought(productEntity.getBought())
                .rated(productEntity.getRated())
                .sale(productEntity.getSale())
                .price(productEntity.getPrice())
                .images(productEntity.getImages())
                .flashSale(productEntity.getFlashSale())
                .listImages(images)
                .productSize(productSizeResponses)
                .build();
    }
}
