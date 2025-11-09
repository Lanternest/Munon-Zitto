package com.practica.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    
    private static final String SECRET_KEY = "miClaveSecretaSuperSeguraParaJWT2024";
    private static final long EXPIRATION_TIME = 86400000; // 24 horas
    
    // Generar token con rol y DNI
    public String generateToken(String email, String rol, String dni) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", rol);
        if (dni != null) {
            claims.put("dni", dni);
        }
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    
    // Validar token
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    // Extraer email del token
    public String extractEmail(String token) {
        Claims claims = getClaims(token);
        return claims.getSubject();
    }
    
    // Extraer rol del token
    public String extractRol(String token) {
        Claims claims = getClaims(token);
        return (String) claims.get("rol");
    }
    
    // Extraer DNI del token
    public String extractDni(String token) {
        Claims claims = getClaims(token);
        return (String) claims.get("dni");
    }
    
    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}