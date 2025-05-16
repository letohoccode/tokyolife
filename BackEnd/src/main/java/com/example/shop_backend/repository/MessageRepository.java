package com.example.shop_backend.repository;

import com.example.shop_backend.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity,Long> {
    @Query("SELECT mess FROM MessageEntity mess WHERE mess.usersMessage.id = :userId")
    List<MessageEntity> findAllByUsersMessageId(@Param("userId") Long id);
}
