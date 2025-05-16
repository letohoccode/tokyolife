package com.example.shop_backend.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ShopResponse {
    private Long id;
    private String name;
    private String image;
    private String hotline;
    private AuthResponse manageShop;
    private AddressResponse address;
}
