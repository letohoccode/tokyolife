package com.example.shop_backend.service;

import com.example.shop_backend.entity.ImagesEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface ImagesService {
    public List<ImagesEntity > findAllImageByProductId(UUID productId);
    public ImagesEntity findImageById(UUID imageId);
    public void saveImage(ImagesEntity images);
    public void saveAllImage(List<ImagesEntity> entityList);
    public void deleteImage(UUID id);
}
