package org.example.clothes_shop_backend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JWTService {

    public String generateToken(UserDetails userDetails)
    {
        return generateToken(new HashMap<>(),userDetails);
    }

    public String generateToken(HashMap<String, Object> claims, UserDetails userDetails) {
        return builderToken(claims,userDetails);
    }

    private String builderToken(HashMap<String, Object> claims, UserDetails userDetails) {
        var authenticate = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 864000))
                .claim("authorities",authenticate)
                .signWith(getKeys())
                .compact();


    }


    public String extractEmailByToken(String token)
    {
        return extractClaims(Claims::getSubject,token);
    }

    public boolean isValidateToken(String token,UserDetails userDetails)
    {
        String email = extractEmailByToken(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return TokenExpired(token).before(new Date());
    }

    private Date TokenExpired(String token) {
        return extractClaims(Claims::getExpiration,token);
    }

    private <T> T extractClaims(Function<Claims,T> getClaims, String token)
    {
        Claims claims = extractAllClaims(token);
        return getClaims.apply(claims);
    }
    private Claims extractAllClaims(String token)
    {
        return Jwts.parser()
                .verifyWith(getKeys())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getKeys()
    {
        byte[] keyByte = Decoders.BASE64.decode("jhjjhasdowehhsadfgsdfgsdlgsldfsdfsjkdfhjwsfwiiehwfhwfwefwewfsdfs");
        return Keys.hmacShaKeyFor(keyByte);
    }
}
