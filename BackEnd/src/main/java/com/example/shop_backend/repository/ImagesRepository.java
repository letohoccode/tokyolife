package com.example.shop_backend.repository;

import com.example.shop_backend.entity.ImagesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ImagesRepository extends JpaRepository<ImagesEntity, UUID> {
    @Query("SELECT i FROM ImagesEntity i WHERE i.productEntity.id= :productId")
    List<ImagesEntity> findAllImageByProductId(@Param("productId")UUID productId);
}
