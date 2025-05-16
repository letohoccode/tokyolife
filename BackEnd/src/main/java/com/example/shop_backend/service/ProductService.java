package com.example.shop_backend.service;

import com.example.shop_backend.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface ProductService {
    public ProductEntity saveProduct(ProductEntity productEntity);
    public Page<ProductEntity> findProductByCategory(String category,Pageable pageable);
    public Page<ProductEntity> findProductByCategoryAndSale(String category,boolean status,Pageable pageable);

    public Page<ProductEntity> findAllProductById(Pageable pageable);
    public List<ProductEntity> SearchProductByKeyword(String keyword );
    public ProductEntity findProductById(UUID id);
    public ProductEntity updateProduct(ProductEntity productEntity);
    public void deleteProduct(UUID id);
    public void updateFlashSale(UUID productId,boolean status);
    public Page<ProductEntity> findProductFlashSale(boolean status,Pageable pageable);
}
