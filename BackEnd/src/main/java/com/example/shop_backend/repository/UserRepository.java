package com.example.shop_backend.repository;

import com.example.shop_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);


    @Query("SELECT u FROM User u WHERE u.fullName LIKE %:keyword% OR u.email LIKE %:keyword%")
    List<User> findUserByKeyword(@Param("keyword")String keyword);

    @Modifying
    @Query("UPDATE User u SET u.blocked = :blockType WHERE u.id = :userId ")
    void updateBlockUser(@Param("blockType")boolean blockType,@Param("userId")Long userId);

    @Query("SELECT u FROM User u WHERE u.blocked = false")
    List<User> findUserBlock();

    @Query("SELECT u FROM User u WHERE u.roles= ADMIN")
   Optional<User> findUserByRole();
}
