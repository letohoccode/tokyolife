package com.example.shop_backend.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductStatusRequest {
    private boolean status;
    private String category;
    private String sort;
    private String sortType;
}
