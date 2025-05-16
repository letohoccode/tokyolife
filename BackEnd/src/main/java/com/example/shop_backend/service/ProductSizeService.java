package com.example.shop_backend.service;

import com.example.shop_backend.entity.Address;
import com.example.shop_backend.entity.ProductSize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface ProductSizeService {
    public ProductSize saveProductSize(ProductSize productSize);
    public List<ProductSize> saveListProductSize(List<ProductSize> productSizes);
    public List<ProductSize> findAllProductSize();
    public List<ProductSize> findProductSizeById(UUID id);
    public ProductSize updateProductSize(ProductSize ProductSize);
    public void deleteProductSize(UUID id);
}
