package com.example.shop_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "productSize")
public class ProductSize {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id")
    private UUID id;

    @Column(name = "size")
    private String size;
    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "color")
    private String color;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity productEntity;
}
