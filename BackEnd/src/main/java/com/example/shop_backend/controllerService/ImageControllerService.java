package com.example.shop_backend.controllerService;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class ImageControllerService {
    private final Cloudinary cloudinary;

    public ImageControllerService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImages(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        String publicValue = generatePublicValue(file.getOriginalFilename());
        String extension = getFileName(file.getOriginalFilename())[1];
        File fileUpload = convFile(file);
        var imageUrl = cloudinary.uploader().upload(fileUpload, ObjectUtils.asMap("public_id",publicValue));
        cleanDisk(fileUpload);
        return imageUrl.get("url").toString();
    }

    public List<String> uploadListImage(MultipartFile[] files) throws IOException
    {
        return Arrays.stream(files).map(f -> {
            String images =null;
            try{
               images = uploadImages(f);
            }catch (IOException e)
            {
                throw new RuntimeException(e);
            }
            return  images;
        }).toList();
    }
    private void cleanDisk(File fileUpload) {
        try {
            Path path = fileUpload.toPath();
            Files.delete(path);
        }catch (IOException e)
        {
            throw new RuntimeException("");
        }
    }

    private File convFile(MultipartFile file) throws IOException {
        assert file.getOriginalFilename() != null;
        File convert = new File(StringUtils.join(generatePublicValue(file.getOriginalFilename()),getFileName(file.getOriginalFilename())[1]));
        try(InputStream is = file.getInputStream()){
            Files.copy(is,convert.toPath());
        }
        return convert;
    }


    private String generatePublicValue(String originalFilename) {
        String fileName = getFileName(originalFilename)[0];
        return StringUtils.join(UUID.randomUUID().toString(),"_",fileName);
    }
    private String[] getFileName(String originalFilename)
    {
        return originalFilename.split("\\.");
    }


}
