package com.example.shop_backend.response;

import com.example.shop_backend.mapper.AddressMapper;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class OrderResponse {
    private String id;
    private Long totalPrice;
    private Long totalItem;
    private String orderStatus;
    private List<OrderItemResponse> itemResponseList;
    private String date;
    private String userName;
    private Long orderTotal;
    private AddressMapper address;
    private String email;
    private String phone;
}
