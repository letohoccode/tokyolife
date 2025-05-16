package com.example.shop_backend.service;

import com.example.shop_backend.entity.OrderItem;
import com.example.shop_backend.entity.ProductEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface OrderItemService {
    public OrderItem saveOrderItem(OrderItem OrderItem);
    public List<OrderItem> findAllOrderItemById();
    public List<OrderItem> findOrderItemByOrderId(UUID uuid);
    public OrderItem findOrderItemById(UUID id);
    public OrderItem updateOrderItem(OrderItem OrderItem);
    public void deleteOrderItem(UUID id);
    public void saveListOrderItem(List<OrderItem> orderItems);
}
