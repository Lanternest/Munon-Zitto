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

function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('email');
  localStorage.removeItem('dni');
  window.location.href = '/index.html';
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
window.obtenerSesion = obtenerSesion;
window.estaAutenticado = estaAutenticado;
window.verificarRol = verificarRol;