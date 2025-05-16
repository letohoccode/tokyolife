package com.example.shop_backend.repository;

import com.example.shop_backend.entity.OrderEntity;
import com.example.shop_backend.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, UUID> {
    @Query("SELECT orderItem FROM OrderItem orderItem WHERE orderItem.orderEntity.id = :orderId")
    List<OrderItem> findOrderByOrderId(@Param("orderId") UUID id);
}
