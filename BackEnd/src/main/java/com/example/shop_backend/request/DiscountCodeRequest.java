package com.example.shop_backend.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DiscountCodeRequest {
    private String code;
    private Long rate;
    private Long date;
}
