package com.example.shop_backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Builder
public class OrderRequest {
    @NotNull(message = "user Id not null")
    private Long userId;
    @NotNull(message = "total Item not null")
    private Long totalItems;
    @NotNull(message = "total price not null")
    private Long totalPrice;
    @NotNull(message = "product item not null")
    @NotEmpty(message = "product item noy empty")
    private List<OrderItemRequest> orderItemRequests;
    private String comment;

}
