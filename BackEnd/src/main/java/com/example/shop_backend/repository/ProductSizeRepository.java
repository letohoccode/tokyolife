package com.example.shop_backend.repository;

import com.example.shop_backend.entity.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize, UUID> {
    @Query("SELECT s FROM ProductSize s WHERE s.productEntity.id = :sizeId")
    List<ProductSize> findAllSizeByProductId(@Param("sizeId") UUID id);


}
