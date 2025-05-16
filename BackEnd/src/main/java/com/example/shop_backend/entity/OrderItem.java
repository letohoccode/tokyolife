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
@Table(name = "orderitems")
public class OrderItem {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id",updatable = false)
    private UUID id;

    @Column(name = "names")
    private String name;

    @Column(name = "images")
    private String image;

    @Column(name = "quantity")
    private Long quantity;
    @Column(name = "totalPrice")
    private Long totalPrice;
    @Column(name = "color")
    private String color;
    @Column(name = "size")
    private String size;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderEntity orderEntity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity productEntity;
}
