package com.example.shop_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "product")
@EntityListeners(AuditingEntityListener.class)
public class ProductEntity {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id",updatable = false)
    private UUID id;

    @Column(name = "names")
    private String productName;

    @Column(name = "titles")
    private String title;

    @Column(name = "described",columnDefinition = "LONGTEXT")
    private String described;

    @Column(name = "price")
    private Long price;

    @Column(name = "flash_sale")
    private boolean flashSale;

    @Column(name = "sales")
    private Long sale;

    @Column(name = "bought")
    private Long bought;

    @Column(name = "rated")
    private double rated;

    @Column(name = "images")
    private String images;

    @Column(name = "category")
    private String productType;

    @Column(name = "createAt")
    @CreatedDate
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createAt;

    @Column(name = "LastAt")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;


    public boolean getFlashSale()
    {
        return this.flashSale;
    }
}
