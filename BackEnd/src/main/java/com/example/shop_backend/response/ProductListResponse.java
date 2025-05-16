package com.example.shop_backend.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ProductListResponse {
    private String id;
    private String productName;
    private String image;
    private Long sale;
    private Long price;
    private Long bought;
    private boolean flashSale;
    private String productType;
}
