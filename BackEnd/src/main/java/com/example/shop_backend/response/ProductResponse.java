package com.example.shop_backend.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ProductResponse {
    private String id;
    private String productName;
    private String title;
    private String described;
    private String images;
    private Long price;
    private Long priceDiscount;
    private Long sale;
    private Long bought;
    private double rated;
    private boolean flashSale;
    private ShopResponse shop;
    private List<ProductSizeResponse> productSize;
    private List<String> listImages;
}
