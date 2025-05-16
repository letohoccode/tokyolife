package com.example.shop_backend.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ProductSizeResponse {
    private String id;
    private String size;
    private Long quantity;
    private String color;
}
