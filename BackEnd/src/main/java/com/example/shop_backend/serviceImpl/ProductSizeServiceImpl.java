package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.ProductSize;
import com.example.shop_backend.repository.ProductSizeRepository;
import com.example.shop_backend.service.ProductSizeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class ProductSizeServiceImpl implements ProductSizeService {
    private final ProductSizeRepository productSizeRepository;
    @Transactional
    @Override
    public ProductSize saveProductSize(ProductSize productSize) {
        return productSizeRepository.save(productSize);
    }

    @Override
    public List<ProductSize> saveListProductSize(List<ProductSize> productSizes) {
        return productSizeRepository.saveAll(productSizes);
    }

    @Override
    public List<ProductSize> findAllProductSize() {
        return productSizeRepository.findAll();
    }

    @Override
    public List<ProductSize>  findProductSizeById(UUID id) {
        return productSizeRepository.findAllSizeByProductId(id);
    }

    @Transactional
    @Override
    public ProductSize updateProductSize(ProductSize ProductSize) {
        return productSizeRepository.save(ProductSize);
    }

    @Transactional
    @Override
    public void deleteProductSize(UUID id) {
        productSizeRepository.deleteById(id);
    }
}
