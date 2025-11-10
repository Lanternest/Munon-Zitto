package com.practica.service;

import com.practica.dao.ClienteDAO;
import com.practica.dao.LoginDAO;
import com.practica.dao.RegisterDAO;
import java.util.List;

public interface ClienteService {

    ClienteDAO obtenerPorDni(String dni);
    List<ClienteDAO> listarTodos();
    ClienteDAO actualizar(String dni, ClienteDAO clienteDAO);
    void eliminar(String dni);
    ClienteDAO registrar(ClienteDAO clienteDAO);
}