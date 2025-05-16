package com.example.shop_backend.repository;

import com.example.shop_backend.entity.UsersMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersMessageRepository extends JpaRepository<UsersMessage,Long> {
    @Query("SELECT mess FROM UsersMessage mess WHERE mess.user.id= :userId")
    List<UsersMessage> findUserMessageByUserId(@Param("userId") Long id);
}
