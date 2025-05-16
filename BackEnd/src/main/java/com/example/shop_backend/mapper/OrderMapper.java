package com.example.shop_backend.mapper;

import com.example.shop_backend.entity.OrderEntity;
import com.example.shop_backend.entity.OrderItem;
import com.example.shop_backend.response.OrderItemResponse;
import com.example.shop_backend.response.OrderResponse;
import com.example.shop_backend.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderMapper {
    private final OrderItemService orderItemService;
    public OrderResponse OrderListResponse(OrderEntity order) {
        List<OrderItem> orderItems = orderItemService.findOrderItemByOrderId(order.getId());
        List<OrderItemResponse> orderItemResponseList = orderItems.stream()
                .map(OrderItemMapper::orderItemResponse)
                .toList();
        return OrderResponse.builder()
                .id(String.valueOf(order.getId()))
                .totalItem(order.getTotalItems())
                .totalPrice(order.getTotalPrice())
                .orderStatus(order.getStatus())
                .userName(order.getUser().getFullName())
                .date(String.valueOf(order.getCreate()))
                .itemResponseList(orderItemResponseList)
                .build();
    }
    public final OrderResponse OrderDetailResponse (OrderEntity orderEntity) {
        List<OrderItem> orderItems = orderItemService.findOrderItemByOrderId(orderEntity.getId());
        List<OrderItemResponse> orderItemResponseList = orderItems.stream()
                .map(OrderItemMapper::orderItemResponse)
                .toList();
        return OrderResponse.builder()
                .id(String.valueOf(orderEntity.getId()))
                .orderStatus(orderEntity.getStatus())
                .date(String.valueOf(orderEntity.getCreate()))
                .totalPrice(orderEntity.getTotalPrice())
                .userName(orderEntity.getUser().getFullName())
                .address(new AddressMapper(orderEntity.getUser().getAddress()))
                .phone(orderEntity.getUser().getPhone())
                .email(orderEntity.getUser().getEmail())
                .itemResponseList(orderItemResponseList)
                .build();
    }
}
