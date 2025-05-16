package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.OrderEntity;
import com.example.shop_backend.repository.OrderRepository;
import com.example.shop_backend.service.OrderService;
import com.example.shop_backend.utilsEnum.OrderTypeStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    @Override
    public OrderEntity saveOrderEntity(OrderEntity OrderEntity) {
        return orderRepository.save(OrderEntity);
    }

    @Override
    public Page<OrderEntity> findAllOrderByStatus(String status, Pageable pageable) {
        return orderRepository.findOrderByStatus(status,pageable);
    }

    @Override
    public Page<OrderEntity> findAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    @Override
    public List<OrderEntity> findOrderByUserId(Long userId) {
        return orderRepository.findOrderByUserId(userId);
    }

    @Override
    public OrderEntity findOrderEntityId(UUID id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public OrderEntity updateOrderEntity(OrderEntity OrderEntity) {
        return orderRepository.save(OrderEntity);
    }

    @Override
    public void deleteOrderEntity(UUID id) {
        orderRepository.deleteById(id);
    }

    @Override
    public List<OrderEntity> findTotalPrice(String status) {
        return orderRepository.findTotalPrice(status);
    }

    @Transactional
    @Override
    public void updateStatusOrder(String status, UUID orderId) {
        orderRepository.updateStatus(status,orderId);
    }


}
