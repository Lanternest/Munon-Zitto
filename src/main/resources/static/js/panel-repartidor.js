// PANEL REPARTIDOR - FUNCIONALIDAD
// ========================================

let entregasPendientes = [];

document.addEventListener('DOMContentLoaded', function() {
  // Verificar autenticación y rol
  if (!estaAutenticado()) {
    window.location.href = '../html/login.html';
    return;
  }
  
  if (!verificarRol('REPARTIDOR')) {
    return;
  }
  
  // Cargar entregas pendientes
  cargarEntregas();
  
  console.log('Panel Repartidor inicializado correctamente');
});

// CARGAR ENTREGAS DESDE EL BACKEND
// ========================================

async function cargarEntregas() {
  try {
    const sesion = obtenerSesion();
    const dniR = sesion.dni;
    
    if (!dniR) {
      throw new Error('DNI del repartidor no encontrado');
    }
    
    // Obtener entregas asignadas al repartidor
    const entregas = await fetchAPI(`/repartidor/mis-entregas/${dniR}`, {
      method: 'GET'
    });
    
    entregasPendientes = entregas;
    
    renderizarEntregas();
    actualizarContadorEntregas();
    
  } catch (error) {
    console.error('Error al cargar entregas:', error);
    mostrarMensajeRepartidor('Error al cargar las entregas. Mostrando datos de ejemplo.', 'error');
    
    // Mostrar mensaje si no hay entregas
    verificarEntregasRestantes();
  }
}

// RENDERIZAR ENTREGAS
// ========================================

function renderizarEntregas() {
  const listaEntregas = document.querySelector('.entregas-lista');
  
  if (!listaEntregas) return;
  
  listaEntregas.innerHTML = '';
  
  if (entregasPendientes.length === 0) {
    verificarEntregasRestantes();
    return;
  }
  
  entregasPendientes.forEach(entrega => {
    const entregaHTML = crearEntregaHTML(entrega);
    listaEntregas.innerHTML += entregaHTML;
  });
  
  // Agregar eventos a los elementos
  agregarEventosEntregas();
}

function crearEntregaHTML(entrega) {
  const estadoActual = entrega.estado || 'Pendiente';
  const estadoTexto = estadoActual.replace('_', ' ');
  
  // Mapear estados a clases CSS
  const estadoClase = estadoActual.toLowerCase().replace('_', '-');
  const estadoColor = {
    'pendiente': '#ffc107',
    'confirmado': '#17a2b8',
    'en-preparacion': '#ff9800',
    'en-camino': '#00b4d8',
    'entregado': '#28a745',
    'cancelado': '#dc3545'
  }[estadoClase] || '#666';
  
  // Estados disponibles según el estado actual
  const estadosDisponibles = obtenerEstadosDisponibles(estadoActual);
  
  return `
    <div class="entrega-item" data-pedido="${entrega.idPedido}">
      <div class="entrega-info">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h3>Pedido #${entrega.idPedido.toString().padStart(3, '0')}</h3>
          <span class="estado-badge" style="background-color: ${estadoColor}; color: white; padding: 5px 12px; border-radius: 15px; font-size: 0.85rem; font-weight: 600;">
            ${estadoTexto}
          </span>
        </div>
        <p class="entrega-cliente" onclick="llamarCliente('${entrega.clienteTelefono}')">
          <svg class="icono-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          ${entrega.clienteNombre}
        </p>
        <p class="entrega-direccion" onclick="abrirEnMaps('${entrega.direccionEntrega}')">
          <svg class="icono-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${entrega.direccionEntrega}
        </p>
        <p class="entrega-telefono" onclick="llamarCliente('${entrega.clienteTelefono}')">
          <svg class="icono-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          ${entrega.clienteTelefono}
        </p>
        ${entrega.observaciones ? `
        <p class="entrega-observaciones">
          <svg class="icono-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Observaciones: ${entrega.observaciones}
        </p>
        ` : ''}
        <p class="entrega-total">
          <strong>Total:</strong> $${typeof entrega.precioTotal === 'number' ? entrega.precioTotal.toLocaleString('es-AR') : entrega.precioTotal}
        </p>
      </div>
      <div class="entrega-acciones">
        <div class="estado-selector">
          <label for="estado-${entrega.idPedido}" style="display: block; margin-bottom: 5px; font-size: 0.9rem; color: #666; font-weight: 600;">
            Cambiar Estado:
          </label>
          <select id="estado-${entrega.idPedido}" class="select-estado" onchange="actualizarEstadoPedido(${entrega.idPedido}, this.value)">
            ${estadosDisponibles.map(estado => 
              `<option value="${estado}" ${estado === estadoActual ? 'selected' : ''}>${estado.replace('_', ' ')}</option>`
            ).join('')}
          </select>
        </div>
      </div>
    </div>
  `;
}

function obtenerEstadosDisponibles(estadoActual) {
  const estados = {
    'Pendiente': ['Pendiente', 'Confirmado', 'En_Preparacion', 'En_Camino'],
    'Confirmado': ['Confirmado', 'En_Preparacion', 'En_Camino'],
    'En_Preparacion': ['En_Preparacion', 'En_Camino'],
    'En_Camino': ['En_Camino', 'Entregado'],
    'Entregado': ['Entregado'],
    'Cancelado': ['Cancelado']
  };
  
  return estados[estadoActual] || ['Pendiente', 'Confirmado', 'En_Preparacion', 'En_Camino', 'Entregado'];
}

// FUNCIÓN PARA ACTUALIZAR ESTADO DEL PEDIDO
// ========================================

async function actualizarEstadoPedido(pedidoId, nuevoEstado) {
  try {
    // Actualizar estado del pedido en el backend
    await fetchAPI(`/repartidor/actualizar-estado/${pedidoId}?estado=${nuevoEstado}`, {
      method: 'PATCH'
    });
    
    // Actualizar el estado en el array local
    const entrega = entregasPendientes.find(e => e.idPedido === pedidoId);
    if (entrega) {
      entrega.estado = nuevoEstado;
    }
    
    // Si el estado es Entregado, remover de la lista después de un momento
    if (nuevoEstado === 'Entregado') {
      mostrarMensajeRepartidor('Pedido marcado como entregado', 'success');
      
      setTimeout(() => {
        const entregaItem = document.querySelector(`.entrega-item[data-pedido="${pedidoId}"]`);
        if (entregaItem) {
          entregaItem.style.transition = 'all 0.5s ease';
          entregaItem.style.opacity = '0';
          entregaItem.style.transform = 'translateX(100%)';
          
          setTimeout(() => {
            entregaItem.remove();
            entregasPendientes = entregasPendientes.filter(e => e.idPedido !== pedidoId);
            actualizarContadorEntregas();
            verificarEntregasRestantes();
          }, 500);
        }
      }, 1000);
    } else {
      // Actualizar la visualización del estado
      const entregaItem = document.querySelector(`.entrega-item[data-pedido="${pedidoId}"]`);
      if (entregaItem) {
        const estadoBadge = entregaItem.querySelector('.estado-badge');
        if (estadoBadge) {
          const estadoTexto = nuevoEstado.replace('_', ' ');
          const estadoClase = nuevoEstado.toLowerCase().replace('_', '-');
          const estadoColor = {
            'pendiente': '#ffc107',
            'confirmado': '#17a2b8',
            'en-preparacion': '#ff9800',
            'en-camino': '#00b4d8',
            'entregado': '#28a745',
            'cancelado': '#dc3545'
          }[estadoClase] || '#666';
          
          estadoBadge.textContent = estadoTexto;
          estadoBadge.style.backgroundColor = estadoColor;
        }
        
        // Actualizar el selector de estados
        const selectEstado = entregaItem.querySelector('.select-estado');
        if (selectEstado) {
          const estadosDisponibles = obtenerEstadosDisponibles(nuevoEstado);
          selectEstado.innerHTML = estadosDisponibles.map(estado => 
            `<option value="${estado}" ${estado === nuevoEstado ? 'selected' : ''}>${estado.replace('_', ' ')}</option>`
          ).join('');
        }
      }
      
      mostrarMensajeRepartidor(`Estado actualizado a: ${nuevoEstado.replace('_', ' ')}`, 'success');
    }
    
  } catch (error) {
    console.error('Error al actualizar estado:', error);
    mostrarMensajeRepartidor(error.message || 'Error al actualizar el estado del pedido', 'error');
    
    // Recargar entregas para restaurar el estado anterior
    await cargarEntregas();
  }
}

// FUNCIÓN PARA CONFIRMAR ENTREGA (mantener compatibilidad)
// ========================================

async function confirmarEntrega(pedidoId) {
  await actualizarEstadoPedido(pedidoId, 'Entregado');
}

// FUNCIÓN PARA ACTUALIZAR CONTADOR
// ========================================

function actualizarContadorEntregas() {
  const contador = document.querySelector('.badge-count');
  
  if (contador) {
    const cantidad = entregasPendientes.length;
    contador.textContent = `${cantidad} pedido${cantidad !== 1 ? 's' : ''}`;
  }
}

// FUNCIÓN PARA VERIFICAR ENTREGAS RESTANTES
// ========================================

function verificarEntregasRestantes() {
  const listaEntregas = document.querySelector('.entregas-lista');
  
  if (entregasPendientes.length === 0) {
    listaEntregas.innerHTML = `
      <div class="entregas-completadas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h3>¡Todas las entregas completadas!</h3>
        <p>No tienes entregas pendientes por el momento</p>
        <button class="btn-recargar" onclick="cargarEntregas()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; margin-right: 8px;">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          Recargar entregas
        </button>
      </div>
    `;
  }
}

// AGREGAR EVENTOS A ENTREGAS
// ========================================

function agregarEventosEntregas() {
	
}

// FUNCIÓN PARA LLAMAR AL CLIENTE
// ========================================

function llamarCliente(telefono) {
  if (!telefono || telefono === 'N/A') {
    mostrarMensajeRepartidor('Número de teléfono no disponible', 'error');
    return;
  }
  
  // En un dispositivo móvil, esto abrirá la aplicación de teléfono
  window.location.href = `tel:${telefono}`;
}

// FUNCIÓN PARA ABRIR EN MAPS
// ========================================

function abrirEnMaps(direccion) {
  if (!direccion) {
    mostrarMensajeRepartidor('Dirección no disponible', 'error');
    return;
  }
  
  // Abrir Google Maps con la dirección
  const direccionEncoded = encodeURIComponent(direccion);
  window.open(`https://www.google.com/maps/search/?api=1&query=${direccionEncoded}`, '_blank');
}

// FUNCIÓN PARA MOSTRAR MENSAJES
// ========================================

function mostrarMensajeRepartidor(mensaje, tipo = 'info') {
  const mensajeHTML = `
    <div class="mensaje-flotante-repartidor mensaje-${tipo}" id="mensajeFlotanteRepartidor">
      <p>${mensaje}</p>
    </div>
  `;
  
  const mensajeAnterior = document.getElementById('mensajeFlotanteRepartidor');
  if (mensajeAnterior) {
    mensajeAnterior.remove();
  }
  
  document.body.insertAdjacentHTML('beforeend', mensajeHTML);
  
  setTimeout(() => {
    const mensaje = document.getElementById('mensajeFlotanteRepartidor');
    if (mensaje) {
      mensaje.style.opacity = '0';
      mensaje.style.transform = 'translateX(100%)';
      setTimeout(() => mensaje.remove(), 300);
    }
  }, 3000);
}

// ESTILOS ADICIONALES
// ========================================

if (!document.getElementById('estilosRepartidor')) {
  const estilos = `
    <style id="estilosRepartidor">
      .entregas-completadas {
        text-align: center;
        padding: 10%;
        color: #28a745;
      }
      
      .entregas-completadas svg {
        width: 20%;
        max-width: 100px;
        height: auto;
        margin-bottom: 3%;
        color: #28a745;
      }
      
      .entregas-completadas h3 {
        font-size: clamp(1.5rem, 3vw, 2rem);
        margin-bottom: 2%;
        color: #28a745;
      }
      
      .entregas-completadas p {
        font-size: clamp(1rem, 2vw, 1.2rem);
        color: #666;
        margin-bottom: 4%;
      }
      
      .btn-recargar {
        background-color: #00b4d8;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 180, 216, 0.3);
      }
      
      .btn-recargar:hover {
        background-color: #0096b8;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 180, 216, 0.4);
      }
      
      .entrega-observaciones {
        background-color: #fff3cd;
        padding: 10px;
        border-radius: 5px;
        border-left: 4px solid #ffc107;
        margin-top: 10px;
        color: #856404 !important;
      }
      
      .entrega-total {
        background-color: #d4edda;
        padding: 10px;
        border-radius: 5px;
        border-left: 4px solid #28a745;
        margin-top: 10px;
        color: #155724 !important;
        font-size: 1.1rem !important;
      }
      
      .mensaje-flotante-repartidor {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 11000;
        transition: all 0.3s ease;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        max-width: 400px;
      }
      
      .mensaje-success {
        background-color: #28a745;
      }
      
      .mensaje-error {
        background-color: #ff4444;
      }
      
      .mensaje-info {
        background-color: #00b4d8;
      }
      
      @keyframes slideInRight {
        from { 
          transform: translateX(100px); 
          opacity: 0; 
        }
        to { 
          transform: translateX(0); 
          opacity: 1; 
        }
      }
      
      .entrega-telefono, .entrega-direccion, .entrega-cliente {
        cursor: pointer;
        transition: all 0.2s ease;
        padding: 5px;
        border-radius: 5px;
      }
      
      .entrega-telefono:hover, .entrega-direccion:hover, .entrega-cliente:hover {
        background-color: #e3f6fc;
        color: #00b4d8;
      }
      
      .icono-inline {
        width: 18px;
        height: 18px;
        color: #00b4d8;
        vertical-align: middle;
      }
      
      .estado-selector {
        margin-top: 10px;
      }
      
      .select-estado {
        width: 100%;
        padding: 10px;
        border: 2px solid #00b4d8;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        background-color: white;
        color: #333;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .select-estado:hover {
        border-color: #0096b8;
        background-color: #f0f9fb;
      }
      
      .select-estado:focus {
        outline: none;
        border-color: #0096b8;
        box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.2);
      }
      
      .estado-badge {
        display: inline-block;
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: capitalize;
        white-space: nowrap;
      }
      
      @media (max-width: 768px) {
        .mensaje-flotante-repartidor {
          right: 10px;
          left: 10px;
          max-width: none;
        }
        
        .btn-recargar {
          width: 100%;
          justify-content: center;
        }
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', estilos);
}

// Hacer funciones globales
window.confirmarEntrega = confirmarEntrega;
window.actualizarEstadoPedido = actualizarEstadoPedido;
window.llamarCliente = llamarCliente;
window.abrirEnMaps = abrirEnMaps;
window.cargarEntregas = cargarEntregas;

console.log('Panel Repartidor inicializado correctamente');

// HACER CLICKEABLES LOS TELÉFONOS Y DIRECCIONES
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Agregar funcionalidad de click a teléfonos
  document.querySelectorAll('.entrega-telefono').forEach(elemento => {
    elemento.addEventListener('click', function() {
      const telefono = this.textContent.trim().split('\n').pop().trim();
      llamarCliente(telefono);
    });
  });
  
  // Agregar funcionalidad de click a direcciones
  document.querySelectorAll('.entrega-direccion').forEach(elemento => {
    elemento.addEventListener('click', function() {
      const direccion = this.textContent.trim().split('\n').pop().trim();
      abrirEnMaps(direccion);
    });
  });
});