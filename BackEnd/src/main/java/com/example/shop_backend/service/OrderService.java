package com.example.shop_backend.service;

import com.example.shop_backend.entity.OrderEntity;
import com.example.shop_backend.entity.ProductEntity;
import com.example.shop_backend.utilsEnum.OrderTypeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface OrderService {
    public OrderEntity saveOrderEntity(OrderEntity OrderEntity);
    public Page<OrderEntity> findAllOrderByStatus(String status, Pageable pageable);
    public List<OrderEntity> findOrderByUserId(Long userId);
    public OrderEntity findOrderEntityId(UUID id);
    public OrderEntity updateOrderEntity(OrderEntity OrderEntity);
    public void deleteOrderEntity(UUID id);
    public List<OrderEntity> findTotalPrice(String status);
    public void updateStatusOrder(String status, UUID orderId);
    public Page<OrderEntity> findAllOrders(Pageable pageable);
}
