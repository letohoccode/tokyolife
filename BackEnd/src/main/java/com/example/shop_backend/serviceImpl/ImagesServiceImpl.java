package com.example.shop_backend.serviceImpl;

import com.example.shop_backend.entity.ImagesEntity;
import com.example.shop_backend.repository.ImagesRepository;
import com.example.shop_backend.service.ImagesService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ImagesServiceImpl implements ImagesService {
    private final ImagesRepository imagesRepository;

    public ImagesServiceImpl(ImagesRepository imagesRepository) {
        this.imagesRepository = imagesRepository;
    }

    @Override
    public List<ImagesEntity> findAllImageByProductId(UUID productId) {
        return imagesRepository.findAllImageByProductId(productId);
    }

    @Override
    public ImagesEntity findImageById(UUID imageId) {
        return imagesRepository.findById(imageId).orElse(null);
    }

    @Transactional
    @Override
    public void saveImage(ImagesEntity images) {
        imagesRepository.save(images);
    }

    @Transactional
    @Override
    public void saveAllImage(List<ImagesEntity> entityList) {
        imagesRepository.saveAll(entityList);
    }

    @Override
    public void deleteImage(UUID id) {
        imagesRepository.deleteById(id);
    }
}
