package com.example.shop_backend.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "conversation")
@EntityListeners(AuditingEntityListener.class)
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",updatable = false)
    private Long id;

    @Column(name = "convId")
    private Long convId;

    @Column(name = "senderId")
    private Long senderId;
    @Column(name = "receiverId")
    private Long receiverId;

    @Column(name = "time")
    @CreatedDate
    private Timestamp createTime;

    @Column(name = "last_time")
    @LastModifiedDate
    private Timestamp lastTime;

    @Column(name = "content",columnDefinition = "TEXT")
    private String content;

    @Column(name = "images")
    private String images;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_mess_id")
    private UsersMessage usersMessage;
}
