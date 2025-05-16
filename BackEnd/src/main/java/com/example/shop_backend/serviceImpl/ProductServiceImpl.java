package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.ProductEntity;
import com.example.shop_backend.repository.ProductRepository;
import com.example.shop_backend.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    @Transactional
    @Override
    public ProductEntity saveProduct(ProductEntity productEntity) {
        return productRepository.save(productEntity);
    }

    @Override
    public Page<ProductEntity> findProductByCategory(String category, Pageable pageable) {
        return productRepository.findProductByCategory(category,pageable);
    }

    @Override
    public Page<ProductEntity> findProductByCategoryAndSale(String category, boolean status, Pageable pageable) {
        return productRepository.findProductByCategoryAndSale(category,status,pageable);
    }

    @Override
    public Page<ProductEntity> findAllProductById(Pageable pageable) {
        return productRepository.findAll(pageable);
    }



    @Override
    public List<ProductEntity> SearchProductByKeyword(String keyword) {
        return productRepository.findProductByKeyword(keyword);
    }

    @Override
    public ProductEntity findProductById(UUID id) {
        return productRepository.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public ProductEntity updateProduct(ProductEntity productEntity) {
        return productRepository.save(productEntity);
    }

    @Transactional
    @Override
    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void updateFlashSale(UUID productId, boolean status) {
        productRepository.updateSale(status,productId);
    }

    @Override
    public Page<ProductEntity> findProductFlashSale(boolean status,Pageable pageable) {
        return productRepository.findProductSale(status,pageable);
    }

}
