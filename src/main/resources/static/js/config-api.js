// CONFIGURACIÓN DE LA API
// ========================================

const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  ENDPOINTS: {
    // Auth
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    
    // Clientes
    CLIENTES: '/clientes',
    
    // Productos
    PRODUCTOS: '/productos',
    
    // Pedidos
    PEDIDOS: '/pedidos',
    
    // Pagos
    PAGOS: '/pagos',
    
    // Admin
    ADMIN_CLIENTES: '/admin/clientes',
    
    // Repartidor
    MIS_ENTREGAS: '/repartidor/mis-entregas',
    ENTREGAR: '/repartidor/entregar'
  }
};

// UTILIDAD PARA HACER PETICIONES
// ========================================

async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || `Error: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en la petición:', error);
    // Si el error ya tiene un mensaje, lanzarlo tal cual
    if (error.message) {
      throw error;
    }
    // Si no, crear un error genérico
    throw new Error('Error de conexión con el servidor');
  }
}

// FUNCIONES DE AUTENTICACIÓN
// ========================================

function guardarSesion(loginResponse) {
  localStorage.setItem('token', loginResponse.token);
  localStorage.setItem('rol', loginResponse.rol);
  localStorage.setItem('email', loginResponse.email);
  localStorage.setItem('dni', loginResponse.dni || '');
}

function limpiarSesionActual() {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('email');
  localStorage.removeItem('dni');
  sessionStorage.clear();
}

function cerrarSesion() {
  limpiarSesionActual();
  window.location.href = '../html/login.html';
}

function obtenerSesion() {
  return {
    token: localStorage.getItem('token'),
    rol: localStorage.getItem('rol'),
    email: localStorage.getItem('email'),
    dni: localStorage.getItem('dni')
  };
}

function estaAutenticado() {
  return !!localStorage.getItem('token');
}

function agregarBotonCerrarSesion() {
  if (!estaAutenticado() || document.getElementById('btnCerrarSesionNav')) {
    return;
  }

  const navPrincipal = document.querySelector('.fondo-marron');
  if (!navPrincipal) {
    return;
  }

  const botonCerrarSesion = document.createElement('button');
  botonCerrarSesion.type = 'button';
  botonCerrarSesion.id = 'btnCerrarSesionNav';
  botonCerrarSesion.className = 'a_local btn-cerrar-sesion-nav';
  botonCerrarSesion.title = 'Cerrar sesión';
  botonCerrarSesion.setAttribute('aria-label', 'Cerrar sesión');
  botonCerrarSesion.innerHTML = `
    <span class="icono-cerrar-sesion" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    </span>
    <h1>Cerrar sesión</h1>
  `;
  botonCerrarSesion.addEventListener('click', cerrarSesion);

  navPrincipal.appendChild(botonCerrarSesion);
}

// VERIFICACIÓN DE ROLES
// ========================================

function verificarRol(rolRequerido) {
  const rol = localStorage.getItem('rol');
  
  if (rol !== rolRequerido) {
    alert('No tienes permisos para acceder a esta página');
    window.location.href = '../html/index.html';
    return false;
  }
  
  return true;
}

// HACER DISPONIBLE GLOBALMENTE
// ========================================

window.API_CONFIG = API_CONFIG;
window.fetchAPI = fetchAPI;
window.guardarSesion = guardarSesion;
window.cerrarSesion = cerrarSesion;
window.limpiarSesionActual = limpiarSesionActual;
window.obtenerSesion = obtenerSesion;
window.estaAutenticado = estaAutenticado;
window.verificarRol = verificarRol;

document.addEventListener('DOMContentLoaded', agregarBotonCerrarSesion);

if (!document.getElementById('estilosSesion')) {
  const estilos = `
    <style id="estilosSesion">
      .btn-cerrar-sesion-nav {
        border: none;
        font-family: inherit;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.1);
        color: aliceblue;
        min-height: 70px;
        padding: 0 18px;
        border-left: 1px solid rgba(255, 255, 255, 0.18);
        transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
      }

      .btn-cerrar-sesion-nav .icono-cerrar-sesion {
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: inherit;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.12);
      }

      .btn-cerrar-sesion-nav svg {
        width: 22px;
        height: 22px;
      }

      .btn-cerrar-sesion-nav:hover {
        transform: translateY(-3px);
        background-color: rgba(255, 255, 255, 0.18);
        color: #00b4d8;
      }

      .btn-cerrar-sesion-nav h1 {
        color: inherit;
      }

      @media (max-width: 768px) {
        .btn-cerrar-sesion-nav {
          flex: 0 0 18%;
          flex-direction: column;
          min-height: auto;
          padding: 2%;
        }

        .btn-cerrar-sesion-nav .icono-cerrar-sesion {
          width: 28px;
          height: 28px;
        }

        .btn-cerrar-sesion-nav svg {
          width: 18px;
          height: 18px;
        }
      }
    </style>
  `;

  document.head.insertAdjacentHTML('beforeend', estilos);
}
