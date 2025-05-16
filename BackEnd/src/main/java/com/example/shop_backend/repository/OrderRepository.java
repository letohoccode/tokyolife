package com.example.shop_backend.repository;

import com.example.shop_backend.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, UUID> {
    @Query("SELECT order FROM OrderEntity order WHERE order.user.id = :userId")
    List<OrderEntity> findOrderByUserId(@Param("userId") Long id);

    @Query("SELECT o FROM OrderEntity o WHERE o.status = :statusType")
    Page<OrderEntity> findOrderByStatus(@Param("statusType")String status, Pageable pageable);

    @Query("SELECT o FROM OrderEntity o WHERE o.status = :SUCCESS")
    List<OrderEntity> findTotalPrice(@Param("SUCCESS")String status);

    @Modifying
    @Query("UPDATE OrderEntity o SET o.status= :statusType WHERE o.id= :orderId")
    void updateStatus(@Param("statusType")String statusType,@Param("orderId")UUID orderId);

    @Query("SELECT o FROM OrderEntity o")
    Page<OrderEntity> findAll(Pageable pageable);
}
