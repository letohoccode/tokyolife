package com.example.shop_backend.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddressResponse {
    private Long id;
    private String street;
    private String commune;
    private String district;
    private String conscious;

}
