package com.practica.util;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

public class Argon2Util {
    
    private static final Argon2 argon2 = Argon2Factory.create();
    
    // Hashear contraseña
    public static String hash(String password) {
        return argon2.hash(2, 65536, 1, password.toCharArray());
    }
    
    // Verificar contraseña
    public static boolean verify(String hash, String password) {
        return argon2.verify(hash, password.toCharArray());
    }
}