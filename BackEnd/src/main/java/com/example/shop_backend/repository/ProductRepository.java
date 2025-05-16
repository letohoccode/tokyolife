package com.example.shop_backend.repository;

import com.example.shop_backend.entity.ProductEntity;
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
public interface ProductRepository extends JpaRepository<ProductEntity, UUID> {


    @Query("SELECT p FROM ProductEntity p WHERE p.productName LIKE %:keyword%")
    List<ProductEntity> findProductByKeyword(@Param("keyword")String keyword);

    @Query("SELECT p FROM ProductEntity p WHERE p.productType= :categoryType")
    Page<ProductEntity> findProductByCategory(@Param("categoryType")String categoryType,Pageable pageable);

    @Query("SELECT p FROM ProductEntity p WHERE p.productType= :categoryType AND p.flashSale = :status")
    Page<ProductEntity> findProductByCategoryAndSale(@Param("categoryType")String categoryType,@Param("status")boolean status,Pageable pageable);

    @Modifying
    @Query("UPDATE ProductEntity p SET p.flashSale = :status WHERE p.id = :productId")
    void updateSale(@Param("status")boolean status,@Param("productId")UUID productID);

    @Query("SELECT p FROM ProductEntity p WHERE p.flashSale =:status")
    Page<ProductEntity> findProductSale(@Param("status")boolean status ,Pageable pageable);
}
