package com.example.shop_backend.repository;

import com.example.shop_backend.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository  extends JpaRepository<Token,Long> {
    @Query("SELECT tk FROM Token tk WHERE tk.token = :token")
    Optional<Token> findTokenByToken(@Param("token") String token);
}
