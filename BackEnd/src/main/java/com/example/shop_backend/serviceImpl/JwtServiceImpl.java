package com.example.shop_backend.serviceImpl;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtServiceImpl {

    public String generateToken(UserDetails userDetails)
    {
        return generateToken(new HashMap<>(),userDetails);
    }

    public String extractEmailToken(String token)
    {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T  extractClaim(String token, Function<Claims ,T> getClaims) {
        Claims claims = extractAllClaims(token);
        return getClaims.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKeys())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isValidToken(String token,UserDetails userDetails)
    {
        String email = extractEmailToken(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return TokenExpired(token).before(new Date());
    }

    private Date TokenExpired(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    private String generateToken(HashMap<String, Object> claims, UserDetails userDetails) {

        long expiration = 86400000;
        return builderToken(claims,userDetails,expiration);
    }

    private String builderToken(HashMap<String, Object> claims, UserDetails userDetails, long expiration) {

        var authorities = userDetails.getAuthorities();
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .claim("authorities",authorities)
                .signWith(getKeys())
                .compact();
    }

    private SecretKey getKeys() {
        byte[] keyByte = Decoders.BASE64.decode("dasjlsdfaldasdasasldfhaslfdhasdhasldfhaslfsafhasdfhdsfsdfsdsdfjsd");
        return Keys.hmacShaKeyFor(keyByte);
    }

    public String parseJWT(StompHeaderAccessor accessor) {

        String token = accessor.getFirstNativeHeader("Authorization");
        String jwt = null;
        if(token != null)
        {
            jwt = token.substring(7);
        }
        return jwt;
    }

    public boolean validateJwtToken(String token)
    {
        try{
            Jwts.parser().verifyWith(getKeys()).build().parse(token);
            return true;
        }catch (MalformedJwtException e){
            log.info("Invalid JWT Token: {}",e.getMessage());
        }catch (ExpiredJwtException e){
            log.info("JWT token is expired");
        }catch (UnsupportedJwtException e){
            log.info("Jwt token is unsupported: {}",e.getMessage());
        }catch (IllegalArgumentException e){
            log.info("Jwt claims string is empty: {}",e.getMessage());
        }
        return false;
    }
}
