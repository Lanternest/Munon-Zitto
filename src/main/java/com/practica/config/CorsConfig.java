package com.practica.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitir todos los orígenes
        config.setAllowCredentials(false);
        config.addAllowedOrigin("*");
        
        // Permitir todos los métodos HTTP
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("PATCH");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        
        // Permitir todos los headers
        config.addAllowedHeader("*");
        
        // Exponer headers en la respuesta
        config.addExposedHeader("*");
        
        // Configurar el tiempo máximo de cache para preflight
        config.setMaxAge(3600L);
        
        // Aplicar esta configuración a todas las rutas
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}

