package com.example.shop_backend.controllerService;

import com.example.shop_backend.entity.ImagesEntity;
import com.example.shop_backend.entity.ProductEntity;
import com.example.shop_backend.entity.ProductSize;
import com.example.shop_backend.mapper.ProductMapper;
import com.example.shop_backend.mapper.ProductSizeMapper;
import com.example.shop_backend.request.ProductRequest;
import com.example.shop_backend.request.ProductUpdateRequest;
import com.example.shop_backend.response.DataResponse;
import com.example.shop_backend.response.PageResponse;
import com.example.shop_backend.response.ProductListResponse;
import com.example.shop_backend.response.ProductResponse;
import com.example.shop_backend.service.ImagesService;
import com.example.shop_backend.service.ProductService;
import com.example.shop_backend.service.ProductSizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductControllerService {
    private final ProductService productService;
    private final ProductMapper productMapper;
    private final ProductSizeService productSizeService;
    private final ImageControllerService imageControllerService;
    private final ImagesService imagesService;
    public DataResponse<PageResponse<List<ProductListResponse>>> findAllProduct(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createAt").descending());
        Page<ProductEntity> productEntities = productService.findAllProductById(pageable);
        List<ProductListResponse> listResponses = productEntities.stream()
                .map(productMapper::productListResponse)
                .toList();
        return DataResponse.<PageResponse<List<ProductListResponse>>>builder()
                .message("lay data thanh cong")
                .code(200)
                .data(PageResponse.<List<ProductListResponse>>builder()
                        .totalElement(productEntities.getTotalElements())
                        .totalPages(productEntities.getTotalPages())
                        .totalElement(productEntities.getTotalElements())
                        .size(productEntities.getSize())
                        .number(productEntities.getNumber())
                        .first(productEntities.isFirst())
                        .last(productEntities.isLast())
                        .data(listResponses)
                        .build())
                .build();
    }

    public DataResponse<ProductResponse> findProductById(String productId) {

        ProductEntity productEntity = productService.findProductById(UUID.fromString(productId));
        List<ProductSize> productSizes = productSizeService.findProductSizeById(UUID.fromString(productId));
        List<ImagesEntity> imagesEntityList = imagesService.findAllImageByProductId(UUID.fromString(productId));


        return DataResponse.<ProductResponse>builder()
                .message("lay data thanh cong")
                .data(productMapper.productResponse(productEntity,productSizes,imagesEntityList))
                .build();
    }



    public DataResponse<List<ProductListResponse>> SearchProduct(String keyword) {
        List<ProductEntity> productEntities = productService.SearchProductByKeyword(keyword);
        List<ProductListResponse> listResponses = productEntities.stream()
                .map(productMapper::productListResponse)
                .toList();
        return DataResponse.<List<ProductListResponse>>builder()
                .message("Lay data thanh cong")
                .data(listResponses)
                .build();
    }

    public DataResponse<PageResponse<List<ProductListResponse>>> findProductByCategory(int page, int size, boolean status, String category, String sort, String sortType) {
        log.info("product: {}",sort);
        Pageable pageable = null;
        if(sortType != null)
        {
            if (Objects.equals(sort,"ASC"))
            {
                pageable = PageRequest.of(page,size,Sort.by(sortType).ascending());
            }else {
                pageable = PageRequest.of(page,size,Sort.by(sortType).descending());
            }
        }else {
            pageable = PageRequest.of(page,size,Sort.by("createAt").descending());
        }

        Page<ProductEntity> productEntities = null;
        if(category != null)
        {
            if(status){
                productEntities = productService.findProductByCategoryAndSale(category, true,pageable);
            }else
                productEntities = productService.findProductByCategoryAndSale(category,false,pageable);
        }else{
            productEntities = productService.findProductFlashSale(status,pageable);
        }

        List<ProductListResponse> productListResponses = productEntities
                .stream()
                .map(productMapper::productListResponse)
                .toList();
        return DataResponse.<PageResponse<List<ProductListResponse>>>builder()
                .message("Lay data thanh cong")
                .data(PageResponse.<List<ProductListResponse>>builder()
                        .totalElement(productEntities.getTotalElements())
                        .totalPages(productEntities.getTotalPages())
                        .totalElement(productEntities.getTotalElements())
                        .size(productEntities.getSize())
                        .number(productEntities.getNumber())
                        .first(productEntities.isFirst())
                        .last(productEntities.isLast())
                        .data(productListResponses)
                        .build())
                .build();
    }

    public DataResponse<String> saveProduct(ProductRequest request) throws IOException {
        log.info("product {}", (Object) request.getProductSizeRequests());
        log.info("product {}", (Object) request.getFiles());
        ProductEntity productEntity = getProductEntity(request);
        ProductEntity product = productService.saveProduct(productEntity);
        List<ProductSize> productSizes = Arrays.stream(request.getProductSizeRequests())
                .map(p -> ProductSizeMapper.productSize(p,product)).toList();

        productSizeService.saveListProductSize(productSizes);
        List<ImagesEntity> imagesEntityList = Arrays.stream(request.getFiles()).map(s -> ImagesEntity.builder().images(s).productEntity(product).build()).toList();
        imagesService.saveAllImage(imagesEntityList);
        return DataResponse.<String>builder()
                .message("tao san pham thanh cong")
                .build();
    }

    private  ProductEntity getProductEntity(ProductRequest request)  {
        ProductEntity productEntity =new ProductEntity();

        productEntity.setProductName(request.getProductName());
        productEntity.setProductType(request.getCategory());
        productEntity.setDescribed(request.getDescribed());
        productEntity.setPrice(request.getPrice());
        productEntity.setImages(Arrays.stream(request.getFiles()).findFirst().orElse(null));
        productEntity.setSale(request.getSale());
        productEntity.setTitle(request.getTitle());
        productEntity.setFlashSale(false);
        return productEntity;
    }

    public DataResponse<String> updateProduct(ProductUpdateRequest request) throws IOException {
        ProductEntity productEntity = productService.findProductById(UUID.fromString(request.getId()));
        if (productEntity == null)
            return DataResponse.<String>builder()
                    .message("san pham khong ton tai")
                    .build();
        productEntity.setProductName(request.getProductName());
        productEntity.setProductType(request.getCategory());
        productEntity.setDescribed(request.getDescribed());
        productEntity.setPrice(request.getPrice());
        productEntity.setSale(productEntity.getSale());
        productEntity.setTitle(request.getTitle());
        productEntity.setFlashSale(productEntity.getFlashSale());
        productService.updateProduct(productEntity);
        return DataResponse.<String>builder()
                .message("cap nhat san pham thanh cong")
                .build();
    }

    public DataResponse<String> deleteProductById(String productId) {
        productService.deleteProduct(UUID.fromString(productId));
        return DataResponse.<String>builder()
                .message("xoa san pham thanh cong")
                .build();
    }

    public DataResponse<String> updateQuantityProduct(String sizeID) {
        return null;
    }

    public DataResponse<String> updateImageProductId(MultipartFile file, String productId) throws IOException {
        ProductEntity productEntity = productService.findProductById(UUID.fromString(productId));
        if (productEntity == null)
            return DataResponse.<String>builder().message("khong ton tai san pham").build();
        String image  = imageControllerService.uploadImages(file);
        productEntity.setImages(image);
        productService.updateProduct(productEntity);
        return DataResponse.<String>builder().message("cap nhat thanh cong").build();
    }


    public DataResponse<String> updateFlashSale(String productId) {
        log.info("product Id :  {}",productId);
        ProductEntity productEntity = productService.findProductById(UUID.fromString(productId));
        log.info("product Name Entity {}",productEntity.getFlashSale());
        if (productEntity == null)
            return DataResponse.<String>builder()
                    .code(201)
                    .message("không có sản phẩm nào")
                    .build();
        productService.updateFlashSale(UUID.fromString(productId),!productEntity.getFlashSale());
        return DataResponse.<String>builder()
                .code(200)
                .message("cập Nhật sản phẩm thành công")
                .build();
    }

    public DataResponse<PageResponse<List<ProductListResponse>>> findProductFlashSale(int page, int size,boolean status) {
        Pageable pageable =PageRequest.of(page,size,Sort.by("createAt").descending());
        Page<ProductEntity> productEntities = productService.findProductFlashSale(status,pageable);
        List<ProductListResponse> productListResponses = productEntities.stream()
                .map(productMapper::productListResponse)
                .toList();
        return DataResponse.<PageResponse<List<ProductListResponse>>>builder()
                .message("lay data thanh cong")
                .code(200)
                .data(PageResponse.<List<ProductListResponse>>builder()
                        .totalElement(productEntities.getTotalElements())
                        .totalPages(productEntities.getTotalPages())
                        .totalElement(productEntities.getTotalElements())
                        .size(productEntities.getSize())
                        .number(productEntities.getNumber())
                        .first(productEntities.isFirst())
                        .last(productEntities.isLast())
                        .data(productListResponses)
                        .build())
                .build();
    }
}
