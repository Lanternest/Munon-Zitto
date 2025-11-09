package com.practica.service;

import com.practica.dao.LoginDAO;
import com.practica.dao.LoginResponseDAO;
import com.practica.dao.RegisterDAO;
import com.practica.dao.UsuarioDAO;

public interface AuthService {
    LoginResponseDAO login(LoginDAO loginDAO);
    UsuarioDAO registrarCliente(RegisterDAO registerDAO);
    UsuarioDAO crearAdministrador(String email, String contrasenia);
    UsuarioDAO crearRepartidor(String email, String contrasenia, String dniR);
}