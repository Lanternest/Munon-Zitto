// ========================================
// PANEL CLIENTE - FUNCIONALIDAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Panel Cliente inicializado correctamente');
});

// ========================================
// FUNCIÓN PARA EDITAR DATOS PERSONALES
// ========================================

function editarDatos() {
  // Obtener los elementos actuales
  const nombre = document.getElementById('nombreCliente').textContent;
  const email = document.getElementById('emailCliente').textContent;
  const telefono = document.getElementById('telefonoCliente').textContent;
  const direccion = document.getElementById('direccionCliente').textContent;
  
  // Crear el formulario de edición
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
            <input type="text" id="editNombre" value="${nombre}" required>
          </div>
          <div class="form-group-modal">
            <label for="editEmail">Email:</label>
            <input type="email" id="editEmail" value="${email}" required>
          </div>
          <div class="form-group-modal">
            <label for="editTelefono">Teléfono:</label>
            <input type="tel" id="editTelefono" value="${telefono}" required>
          </div>
          <div class="form-group-modal">
            <label for="editDireccion">Dirección:</label>
            <input type="text" id="editDireccion" value="${direccion}" required>
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

// ========================================
// FUNCIÓN PARA GUARDAR DATOS
// ========================================

function guardarDatos() {
  // Obtener los nuevos valores
  const nuevoNombre = document.getElementById('editNombre').value;
  const nuevoEmail = document.getElementById('editEmail').value;
  const nuevoTelefono = document.getElementById('editTelefono').value;
  const nuevaDireccion = document.getElementById('editDireccion').value;
  
  // Actualizar los datos en la página
  document.getElementById('nombreCliente').textContent = nuevoNombre;
  document.getElementById('emailCliente').textContent = nuevoEmail;
  document.getElementById('telefonoCliente').textContent = nuevoTelefono;
  document.getElementById('direccionCliente').textContent = nuevaDireccion;
  
  // Cerrar el modal
  cerrarModalEditar();
  
  // Mostrar mensaje de éxito
  mostrarMensaje('Datos actualizados correctamente', 'success');
  
  // Aquí podrías enviar los datos a un servidor
  console.log('Datos actualizados:', {
    nombre: nuevoNombre,
    email: nuevoEmail,
    telefono: nuevoTelefono,
    direccion: nuevaDireccion
  });
}

// ========================================
// FUNCIÓN PARA CERRAR EL MODAL
// ========================================

function cerrarModalEditar() {
  const modal = document.getElementById('modalEditar');
  if (modal) {
    modal.remove();
  }
}

// ========================================
// FUNCIÓN VER DETALLE DE PEDIDO
// ========================================

function verDetallePedido(pedidoId) {
  // Datos de ejemplo del pedido
  const pedidos = {
    1: {
      numero: '#001',
      fecha: '05/11/2024',
      estado: 'Entregado',
      productos: [
        { nombre: 'Medialunas 5kg', cantidad: 2, precio: 5500 },
        { nombre: 'Tortas 8kg', cantidad: 1, precio: 8900 }
      ],
      total: 27500
    },
    2: {
      numero: '#002',
      fecha: '06/11/2024',
      estado: 'En Camino',
      productos: [
        { nombre: 'Roll de Canela', cantidad: 3, precio: 3200 }
      ],
      total: 15800
    },
    3: {
      numero: '#003',
      fecha: '07/11/2024',
      estado: 'Pendiente',
      productos: [
        { nombre: 'Medialunas 10kg', cantidad: 2, precio: 11000 },
        { nombre: 'Croissant Docena', cantidad: 5, precio: 4260 }
      ],
      total: 42300
    }
  };
  
  const pedido = pedidos[pedidoId];
  
  if (!pedido) {
    mostrarMensaje('Pedido no encontrado', 'error');
    return;
  }
  
  // Crear tabla de productos
  let productosHTML = '';
  pedido.productos.forEach(producto => {
    productosHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precio.toLocaleString('es-AR')}</td>
        <td>$${(producto.precio * producto.cantidad).toLocaleString('es-AR')}</td>
      </tr>
    `;
  });
  
  // Crear el modal
  const modalHTML = `
    <div class="modal-overlay" id="modalDetallePedido">
      <div class="modal-contenido modal-grande">
        <div class="modal-header">
          <h2>Detalle del Pedido ${pedido.numero}</h2>
          <button class="btn-cerrar-modal" onclick="cerrarModalDetalle()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="detalle-info">
            <p><strong>Fecha:</strong> ${pedido.fecha}</p>
            <p><strong>Estado:</strong> <span class="estado ${pedido.estado.toLowerCase().replace(' ', '-')}">${pedido.estado}</span></p>
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
                <td colspan="3"><strong>TOTAL</strong></td>
                <td><strong>$${pedido.total.toLocaleString('es-AR')}</strong></td>
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
  
  // Agregar el modal al body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ========================================
// FUNCIÓN PARA CERRAR MODAL DE DETALLE
// ========================================

function cerrarModalDetalle() {
  const modal = document.getElementById('modalDetallePedido');
  if (modal) {
    modal.remove();
  }
}

// ========================================
// FUNCIÓN PARA MOSTRAR MENSAJES
// ========================================

function mostrarMensaje(mensaje, tipo = 'info') {
  const mensajeHTML = `
    <div class="mensaje-flotante mensaje-${tipo}" id="mensajeFlotante">
      <p>${mensaje}</p>
    </div>
  `;
  
  // Eliminar mensajes anteriores
  const mensajeAnterior = document.getElementById('mensajeFlotante');
  if (mensajeAnterior) {
    mensajeAnterior.remove();
  }
  
  // Agregar el nuevo mensaje
  document.body.insertAdjacentHTML('beforeend', mensajeHTML);
  
  // Eliminar después de 3 segundos
  setTimeout(() => {
    const mensaje = document.getElementById('mensajeFlotante');
    if (mensaje) {
      mensaje.remove();
    }
  }, 3000);
}

// ========================================
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