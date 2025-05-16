package com.example.shop_backend.entity;

import com.example.shop_backend.utilsEnum.OrderTypeStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "orderuser")
public class OrderEntity {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.RANDOM)
    @Column(name = "id",updatable = false)
    private UUID id;

    @Column(name = "totalItems")
    private Long totalItems;

    @Column(name = "totalPrice")
    private Long totalPrice;

    @Column(name = "comment" ,columnDefinition = "LONGTEXT")
    private String comment;

    @Column(name = "status")
    private String status;

    @Column(name = "createAt")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime create;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;


}
