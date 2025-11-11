// PANEL CLIENTE - FUNCIONALIDAD
// ========================================

let clienteActual = null;

document.addEventListener('DOMContentLoaded', function() {
	// Verificar autenticación y rol
	  if (!estaAutenticado()) {
	    window.location.href = '../html/login.html';
	    return;
	  }
	  
	  if (!verificarRol('CLIENTE')) {
	    return;
	  }
	  
	  // Cargar datos del cliente
	  cargarDatosCliente();
	  cargarPedidosCliente();
	  
	  console.log('Panel Cliente inicializado correctamente');
	});
	
// CARGAR DATOS DEL CLIENTE
// ========================================

	async function cargarDatosCliente() {
	  try {
	    const sesion = obtenerSesion();
	    const dni = sesion.dni;
	    
	    if (!dni) {
	      throw new Error('DNI no encontrado en la sesión');
	    }
	    
	    // Obtener datos del cliente por DNI
	    const cliente = await fetchAPI(`/clientes/${dni}`, {
	      method: 'GET'
	    });
	    
	    clienteActual = cliente;
	    
	    // Actualizar la interfaz con los datos
	    document.getElementById('nombreCliente').textContent = `${cliente.nombre} ${cliente.apellido}`;
	    document.getElementById('emailCliente').textContent = cliente.email;
	    document.getElementById('telefonoCliente').textContent = cliente.telefono;
	    document.getElementById('direccionCliente').textContent = cliente.direccion;
	    
	  } catch (error) {
	    console.error('Error al cargar datos del cliente:', error);
	    mostrarMensaje('Error al cargar los datos del cliente', 'error');
	  }
	}
	
// CARGAR PEDIDOS DEL CLIENTE
// ========================================

	async function cargarPedidosCliente() {
	  try {
	    const sesion = obtenerSesion();
	    const dni = sesion.dni;
	    
	    if (!dni) {
	      throw new Error('DNI no encontrado en la sesión');
	    }
	    
	    // Obtener pedidos del cliente
	    const pedidos = await fetchAPI(`/pedidos/cliente/${dni}`, {
	      method: 'GET'
	    });
	    
	    // Actualizar la tabla de pedidos
	    const tablaPedidos = document.getElementById('tablaPedidos');
	    if (!tablaPedidos) return;
	    
	    tablaPedidos.innerHTML = '';
	    
	    if (pedidos.length === 0) {
	      tablaPedidos.innerHTML = `
	        <tr>
	          <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
	            No tienes pedidos registrados aún
	          </td>
	        </tr>
	      `;
	      return;
	    }
	    
	    pedidos.forEach(pedido => {
	      const fila = crearFilaPedido(pedido);
	      tablaPedidos.innerHTML += fila;
	    });
	    
	  } catch (error) {
	    console.error('Error al cargar pedidos:', error);
	    mostrarMensaje('Error al cargar los pedidos', 'error');
	  }
	}
	
	// Recargar pedidos automáticamente cada 30 segundos para ver cambios de estado
	setInterval(() => {
	  if (document.getElementById('tablaPedidos')) {
	    cargarPedidosCliente();
	  }
	}, 30000);

	function crearFilaPedido(pedido) {
	  const fecha = new Date(pedido.fecha).toLocaleDateString('es-AR');
	  const estadoClass = obtenerClaseEstado(pedido.estado);
	  const estadoTexto = formatearEstado(pedido.estado);
	  
	  return `
	    <tr>
	      <td>#${pedido.idPedido.toString().padStart(3, '0')}</td>
	      <td>${fecha}</td>
	      <td><span class="estado ${estadoClass}">${estadoTexto}</span></td>
	      <td>$${pedido.precioTotal.toLocaleString('es-AR')}</td>
	      <td>
	        <button class="btn-ver-detalle" onclick="verDetallePedido(${pedido.idPedido})">
	          Ver Detalle
	        </button>
	      </td>
	    </tr>
	  `;
	}

	function obtenerClaseEstado(estado) {
	  const clases = {
	    'Pendiente': 'pendiente',
	    'Confirmado': 'pendiente',
	    'En_Preparacion': 'en-camino',
	    'En_Camino': 'en-camino',
	    'Entregado': 'entregado',
	    'Cancelado': 'cancelado'
	  };
	  return clases[estado] || 'pendiente';
	}

	function formatearEstado(estado) {
	  return estado.replace(/_/g, ' ');
	}

// FUNCIÓN PARA EDITAR DATOS PERSONALES
// ========================================

function editarDatos() {
  if (!clienteActual) {
    mostrarMensaje('Error: No se han cargado los datos del cliente', 'error');
    return;
  }
  
  const formularioHTML = `
    <div class="modal-overlay" id="modalEditar">
      <div class="modal-contenido">
        <div class="modal-header">
          <h2>Editar Datos Personales</h2>
          <button class="btn-cerrar-modal" onclick="cerrarModalEditar()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <form id="formEditarDatos" class="modal-form">
          <div class="form-group-modal">
            <label for="editNombre">Nombre:</label>
            <input type="text" id="editNombre" value="${clienteActual.nombre}" required>
          </div>
          <div class="form-group-modal">
            <label for="editApellido">Apellido:</label>
            <input type="text" id="editApellido" value="${clienteActual.apellido}" required>
          </div>
          <div class="form-group-modal">
            <label for="editTelefono">Teléfono:</label>
            <input type="tel" id="editTelefono" value="${clienteActual.telefono}" required>
          </div>
          <div class="form-group-modal">
            <label for="editDireccion">Dirección:</label>
            <input type="text" id="editDireccion" value="${clienteActual.direccion}" required>
          </div>
          <div class="form-group-modal">
            <label for="editCodigoPostal">Código Postal:</label>
            <input type="number" id="editCodigoPostal" value="${clienteActual.codigoPostal}" required>
          </div>
          <div class="modal-botones">
            <button type="submit" class="btn-guardar-modal">Guardar Cambios</button>
            <button type="button" class="btn-cancelar-modal" onclick="cerrarModalEditar()">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  // Agregar el modal al body
  document.body.insertAdjacentHTML('beforeend', formularioHTML);
  
  // Agregar event listener al formulario
  document.getElementById('formEditarDatos').addEventListener('submit', function(e) {
    e.preventDefault();
    guardarDatos();
  });
}

// FUNCIÓN PARA GUARDAR DATOS
// ========================================

async function guardarDatos() {
  try {
    const nuevoNombre = document.getElementById('editNombre').value.trim();
    const nuevoApellido = document.getElementById('editApellido').value.trim();
    const nuevoTelefono = document.getElementById('editTelefono').value.trim();
    const nuevaDireccion = document.getElementById('editDireccion').value.trim();
    const nuevoCodigoPostal = parseInt(document.getElementById('editCodigoPostal').value);
    
    if (!nuevoNombre || !nuevoApellido || !nuevoTelefono || !nuevaDireccion || !nuevoCodigoPostal) {
      mostrarMensaje('Por favor, complete todos los campos', 'error');
      return;
    }
    
    const datosActualizados = {
      dni: clienteActual.dni,
      nombre: nuevoNombre,
      apellido: nuevoApellido,
      direccion: nuevaDireccion,
      telefono: nuevoTelefono,
      email: clienteActual.email,
      codigoPostal: nuevoCodigoPostal
    };
    
    const btnGuardar = document.querySelector('.btn-guardar-modal');
    btnGuardar.disabled = true;
    btnGuardar.textContent = 'Guardando...';
    
    // Actualizar en el backend
    const clienteActualizado = await fetchAPI(`/clientes/${clienteActual.dni}`, {
      method: 'PUT',
      body: JSON.stringify(datosActualizados)
    });
    
    // Actualizar datos locales
    clienteActual = clienteActualizado;
    
    // Actualizar la interfaz
    document.getElementById('nombreCliente').textContent = `${clienteActualizado.nombre} ${clienteActualizado.apellido}`;
    document.getElementById('emailCliente').textContent = clienteActualizado.email;
    document.getElementById('telefonoCliente').textContent = clienteActualizado.telefono;
    document.getElementById('direccionCliente').textContent = clienteActualizado.direccion;
    
    cerrarModalEditar();
    mostrarMensaje('Datos actualizados correctamente', 'success');
    
  } catch (error) {
    console.error('Error al actualizar datos:', error);
    mostrarMensaje(error.message || 'Error al actualizar los datos', 'error');
    
    const btnGuardar = document.querySelector('.btn-guardar-modal');
    if (btnGuardar) {
      btnGuardar.disabled = false;
      btnGuardar.textContent = 'Guardar Cambios';
    }
  }
}

// FUNCIÓN PARA CERRAR EL MODAL
// ========================================

function cerrarModalEditar() {
  const modal = document.getElementById('modalEditar');
  if (modal) {
    modal.remove();
  }
}

// FUNCIÓN VER DETALLE DE PEDIDO
// ========================================

async function verDetallePedido(pedidoId) {
	try{
	// Obtener detalles del pedido
	const pedido = await fetchAPI(`/pedidos/${pedidoId}`, {
	  method: 'GET'
	});
	
	const fecha = new Date(pedido.fecha).toLocaleDateString('es-AR');
	const estadoClass = obtenerClaseEstado(pedido.estado);
	const estadoTexto = formatearEstado(pedido.estado);
  
	// Crear tabla de productos
	    let productosHTML = '';
	    
	    if (pedido.detalles && pedido.detalles.length > 0) {
	      pedido.detalles.forEach(detalle => {
	        productosHTML += `
	          <tr>
	            <td>Producto ID: ${detalle.idProductos}</td>
	            <td>${detalle.cantidad}</td>
	            <td>$${detalle.precioUnitario.toLocaleString('es-AR')}</td>
	            <td>$${detalle.subtotal.toLocaleString('es-AR')}</td>
	          </tr>
	        `;
	      });
	    } else {
	      productosHTML = '<tr><td colspan="4" style="text-align: center;">No hay detalles disponibles</td></tr>';
	    }
	    
	    const modalHTML = `
	      <div class="modal-overlay" id="modalDetallePedido">
	        <div class="modal-contenido modal-grande">
	          <div class="modal-header">
	            <h2>Detalle del Pedido #${pedido.idPedido.toString().padStart(3, '0')}</h2>
	            <button class="btn-cerrar-modal" onclick="cerrarModalDetalle()">
	              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
	                <line x1="18" y1="6" x2="6" y2="18"></line>
	                <line x1="6" y1="6" x2="18" y2="18"></line>
	              </svg>
	            </button>
	          </div>
	          <div class="modal-body">
	            <div class="detalle-info">
	              <p><strong>Fecha:</strong> ${fecha}</p>
	              <p><strong>Estado:</strong> <span class="estado ${estadoClass}">${estadoTexto}</span></p>
	              ${pedido.direccionEntrega ? `<p><strong>Dirección de entrega:</strong> ${pedido.direccionEntrega}</p>` : ''}
	              ${pedido.observaciones ? `<p><strong>Observaciones:</strong> ${pedido.observaciones}</p>` : ''}
	            </div>
	            <table class="tabla-modal">
	              <thead>
	                <tr>
	                  <th>Producto</th>
	                  <th>Cantidad</th>
	                  <th>Precio Unit.</th>
	                  <th>Subtotal</th>
	                </tr>
	              </thead>
	              <tbody>
	                ${productosHTML}
	              </tbody>
	              <tfoot>
	                <tr>
	                  <td colspan="3"><strong>Subtotal</strong></td>
	                  <td><strong>$${pedido.subTotal.toLocaleString('es-AR')}</strong></td>
	                </tr>
	                ${pedido.descuentoTotal > 0 ? `
	                <tr>
	                  <td colspan="3"><strong>Descuento</strong></td>
	                  <td><strong>-$${pedido.descuentoTotal.toLocaleString('es-AR')}</strong></td>
	                </tr>
	                ` : ''}
	                <tr>
	                  <td colspan="3"><strong>TOTAL</strong></td>
	                  <td><strong>$${pedido.precioTotal.toLocaleString('es-AR')}</strong></td>
	                </tr>
	              </tfoot>
	            </table>
	          </div>
	          <div class="modal-footer">
	            <button class="btn-cerrar-modal-footer" onclick="cerrarModalDetalle()">Cerrar</button>
	          </div>
	        </div>
	      </div>
	    `;
	    
	    document.body.insertAdjacentHTML('beforeend', modalHTML);
	    
	  } catch (error) {
	    console.error('Error al obtener detalle del pedido:', error);
	    mostrarMensaje('Error al cargar el detalle del pedido', 'error');
	  }
	}

// FUNCIÓN PARA CERRAR MODAL DE DETALLE
// ========================================

function cerrarModalDetalle() {
  const modal = document.getElementById('modalDetallePedido');
  if (modal) {
    modal.remove();
  }
}

// FUNCIÓN PARA MOSTRAR MENSAJES
// ========================================

function mostrarMensaje(mensaje, tipo = 'info') {
  const mensajeHTML = `
    <div class="mensaje-flotante mensaje-${tipo}" id="mensajeFlotante">
      <p>${mensaje}</p>
    </div>
  `;
  
  const mensajeAnterior = document.getElementById('mensajeFlotante');
  if (mensajeAnterior) {
    mensajeAnterior.remove();
  }
  
  document.body.insertAdjacentHTML('beforeend', mensajeHTML);
  
  setTimeout(() => {
    const mensaje = document.getElementById('mensajeFlotante');
    if (mensaje) {
      mensaje.remove();
    }
  }, 3000);
}

// ESTILOS PARA MODALES (agregar dinámicamente)
// ========================================

// Agregar estilos CSS para los modales si no existen
if (!document.getElementById('estilosModales')) {
  const estilos = `
    <style id="estilosModales">
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      }
      
      .modal-contenido {
        background-color: white;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
      }
      
      .modal-grande {
        max-width: 700px;
      }
      
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4%;
        border-bottom: 2px solid #e0e0e0;
      }
      
      .modal-header h2 {
        margin: 0;
        color: #333;
        font-size: 1.5rem;
      }
      
      .btn-cerrar-modal {
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
        padding: 2%;
        border-radius: 50%;
        transition: all 0.3s ease;
      }
      
      .btn-cerrar-modal:hover {
        background-color: #f0f0f0;
        color: #333;
      }
      
      .btn-cerrar-modal svg {
        width: 24px;
        height: 24px;
      }
      
      .modal-form {
        padding: 4%;
      }
      
      .form-group-modal {
        margin-bottom: 4%;
      }
      
      .form-group-modal label {
        display: block;
        margin-bottom: 2%;
        font-weight: 600;
        color: #666;
      }
      
      .form-group-modal input {
        width: 100%;
        padding: 3%;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        box-sizing: border-box;
      }
      
      .form-group-modal input:focus {
        outline: none;
        border-color: #00b4d8;
      }
      
      .modal-botones {
        display: flex;
        gap: 3%;
        margin-top: 5%;
      }
      
      .btn-guardar-modal, .btn-cancelar-modal {
        flex: 1;
        padding: 3%;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .btn-guardar-modal {
        background-color: #00b4d8;
        color: white;
      }
      
      .btn-guardar-modal:hover {
        background-color: #0096b8;
      }
      
      .btn-guardar-modal:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
      
      .btn-cancelar-modal {
        background-color: #e0e0e0;
        color: #666;
      }
      
      .btn-cancelar-modal:hover {
        background-color: #ccc;
      }
      
      .modal-body {
        padding: 4%;
      }
      
      .detalle-info {
        margin-bottom: 4%;
      }
      
      .detalle-info p {
        margin: 2% 0;
        font-size: 1rem;
      }
      
      .tabla-modal {
        width: 100%;
        border-collapse: collapse;
      }
      
      .tabla-modal th, .tabla-modal td {
        padding: 2%;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
      }
      
      .tabla-modal thead {
        background-color: #f0f0f0;
      }
      
      .tabla-modal tfoot {
        background-color: #f9f9f9;
        font-size: 1.1rem;
      }
      
      .modal-footer {
        padding: 4%;
        border-top: 2px solid #e0e0e0;
        text-align: right;
      }
      
      .btn-cerrar-modal-footer {
        background-color: #666;
        color: white;
        border: none;
        padding: 2% 4%;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .btn-cerrar-modal-footer:hover {
        background-color: #444;
      }
      
      .mensaje-flotante {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 3% 4%;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 11000;
        animation: slideInRight 0.3s ease;
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
      
      .estado.cancelado {
        background-color: #f8d7da;
        color: #721c24;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes slideInRight {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', estilos);
}

// Hacer funciones globales
window.editarDatos = editarDatos;
window.verDetallePedido = verDetallePedido;
window.cerrarModalEditar = cerrarModalEditar;
window.cerrarModalDetalle = cerrarModalDetalle;