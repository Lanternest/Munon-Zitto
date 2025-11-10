package com.practica.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleResourceNotFound(ResourceNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(BadRequestException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        ex.printStackTrace(); // Log del error completo en consola
        Map<String, String> error = new HashMap<>();
        String errorMessage = ex.getMessage();
        
        // Si es un error de constraint de base de datos, dar un mensaje más claro
        if (errorMessage != null && errorMessage.contains("foreign key constraint")) {
            if (errorMessage.contains("CodigoPostal")) {
                errorMessage = "El código postal no existe en la base de datos";
            } else {
                errorMessage = "Error de integridad referencial: " + errorMessage;
            }
        } else if (errorMessage != null && errorMessage.contains("ConstraintViolationException")) {
            errorMessage = "Error de validación: " + errorMessage;
        }
        
        error.put("error", errorMessage != null ? errorMessage : "Error interno del servidor");
        error.put("details", ex.getClass().getSimpleName());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}