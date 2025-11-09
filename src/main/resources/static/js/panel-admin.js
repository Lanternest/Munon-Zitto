// ========================================
// PANEL ADMINISTRADOR - FUNCIONALIDAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Panel Administrador inicializado correctamente');
});

// ========================================
// FUNCIÓN PARA AGREGAR PRODUCTO
// ========================================

function agregarProducto() {
  const modalHTML = `
    <div class="modal-overlay" id="modalAgregarProducto">
      <div class="modal-contenido">
        <div class="modal-header">
          <h2>Agregar Nuevo Producto</h2>
          <button class="btn-cerrar-modal" onclick="cerrarModalProducto()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <form id="formAgregarProducto" class="modal-form">
          <div class="form-group-modal">
            <label for="nombreProducto">Nombre del Producto:</label>
            <input type="text" id="nombreProducto" required>
          </div>
          <div class="form-group-modal">
            <label for="pesoProducto">Peso/Cantidad:</label>
            <input type="text" id="pesoProducto" placeholder="Ej: 5kg, Docena" required>
          </div>
          <div class="form-group-modal">
            <label for="stockProducto">Stock:</label>
            <input type="number" id="stockProducto" min="0" required>
          </div>
          <div class="form-group-modal">
            <label for="precioProducto">Precio:</label>
            <input type="number" id="precioProducto" min="0" step="0.01" required>
          </div>
          <div class="modal-botones">
            <button type="submit" class="btn-guardar-modal">Agregar Producto</button>
            <button type="button" class="btn-cancelar-modal" onclick="cerrarModalProducto()">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  document.getElementById('formAgregarProducto').addEventListener('submit', function(e) {
    e.preventDefault();
    guardarNuevoProducto();
  });
}

function guardarNuevoProducto() {
  const nombre = document.getElementById('nombreProducto').value;
  const peso = document.getElementById('pesoProducto').value;
  const stock = document.getElementById('stockProducto').value;
  const precio = document.getElementById('precioProducto').value;
  
  const nuevoId = Date.now();
  
  const estadoStock = stock > 10 ? 'En Stock' : 'Stock Bajo';
  const claseStock = stock > 10 ? 'stock-ok' : 'stock-bajo';
  
  const nuevaFila = `
    <tr data-id="${nuevoId}">
      <td>${nombre}</td>
      <td>${peso}</td>
      <td>${stock} unidades</td>
      <td>$${parseFloat(precio).toLocaleString('es-AR')}</td>
      <td><span class="${claseStock}">${estadoStock}</span></td>
      <td>
        <button class="btn-accion-editar" onclick="editarProducto(${nuevoId})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="btn-accion-eliminar" onclick="eliminarProducto(${nuevoId})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </td>
    </tr>
  `;
  
  document.getElementById('tablaStock').insertAdjacentHTML('beforeend', nuevaFila);
  
  cerrarModalProducto();
  mostrarMensajeAdmin('Producto agregado correctamente', 'success');
  
  console.log('Producto agregado:', { nombre, peso, stock, precio });
}

function cerrarModalProducto() {
  const modal = document.getElementById('modalAgregarProducto');
  if (modal) {
    modal.remove();
  }
}

// ========================================
// FUNCIÓN PARA EDITAR PRODUCTO
// ========================================

function editarProducto(productoId) {
  const fila = document.querySelector(`tr[data-id="${productoId}"]`);
  
  if (!fila) {
    mostrarMensajeAdmin('Producto no encontrado', 'error');
    return;
  }
  
  const celdas = fila.querySelectorAll('td');
  const nombre = celdas[0].textContent;
  const peso = celdas[1].textContent;
  const stock = celdas[2].textContent.replace(' unidades', '');
  const precio = celdas[3].textContent.replace('$', '').replace('.', '');
  
  const modalHTML = `
    <div class="modal-overlay" id="modalEditarProducto">
      <div class="modal-contenido">
        <div class="modal-header">
          <h2>Editar Producto</h2>
          <button class="btn-cerrar-modal" onclick="cerrarModalEditar()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <form id="formEditarProducto" class="modal-form">
          <div class="form-group-modal">
            <label for="editNombreProducto">Nombre del Producto:</label>
            <input type="text" id="editNombreProducto" value="${nombre}" required>
          </div>
          <div class="form-group-modal">
            <label for="editPesoProducto">Peso/Cantidad:</label>
            <input type="text" id="editPesoProducto" value="${peso}" required>
          </div>
          <div class="form-group-modal">
            <label for="editStockProducto">Stock:</label>
            <input type="number" id="editStockProducto" value="${stock}" min="0" required>
          </div>
          <div class="form-group-modal">
            <label for="editPrecioProducto">Precio:</label>
            <input type="number" id="editPrecioProducto" value="${precio}" min="0" step="0.01" required>
          </div>
          <div class="modal-botones">
            <button type="submit" class="btn-guardar-modal">Guardar Cambios</button>
            <button type="button" class="btn-cancelar-modal" onclick="cerrarModalEditar()">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  document.getElementById('formEditarProducto').addEventListener('submit', function(e) {
    e.preventDefault();
    guardarEdicionProducto(productoId);
  });
}

function guardarEdicionProducto(productoId) {
  const nombre = document.getElementById('editNombreProducto').value;
  const peso = document.getElementById('editPesoProducto').value;
  const stock = document.getElementById('editStockProducto').value;
  const precio = document.getElementById('editPrecioProducto').value;
  
  const fila = document.querySelector(`tr[data-id="${productoId}"]`);
  const celdas = fila.querySelectorAll('td');
  
  const estadoStock = stock > 10 ? 'En Stock' : 'Stock Bajo';
  const claseStock = stock > 10 ? 'stock-ok' : 'stock-bajo';
  
  celdas[0].textContent = nombre;
  celdas[1].textContent = peso;
  celdas[2].textContent = `${stock} unidades`;
  celdas[3].textContent = `$${parseFloat(precio).toLocaleString('es-AR')}`;
  celdas[4].innerHTML = `<span class="${claseStock}">${estadoStock}</span>`;
  
  cerrarModalEditar();
  mostrarMensajeAdmin('Producto actualizado correctamente', 'success');
  
  console.log('Producto editado:', { productoId, nombre, peso, stock, precio });
}

function cerrarModalEditar() {
  const modal = document.getElementById('modalEditarProducto');
  if (modal) {
    modal.remove();
  }
}

// ========================================
// FUNCIÓN PARA ELIMINAR PRODUCTO
// ========================================

function eliminarProducto(productoId) {
  if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    const fila = document.querySelector(`tr[data-id="${productoId}"]`);
    
    if (fila) {
      fila.style.transition = 'all 0.5s ease';
      fila.style.opacity = '0';
      fila.style.transform = 'translateX(-100%)';
      
      setTimeout(() => {
        fila.remove();
        mostrarMensajeAdmin('Producto eliminado correctamente', 'success');
        console.log('Producto eliminado:', productoId);
      }, 500);
    }
  }
}

// ========================================
// FUNCIÓN PARA VER USUARIO
// ========================================

function verUsuario(usuarioId) {
  const usuarios = {
    1: { nombre: 'Juan Pérez', email: 'juan.perez@email.com', telefono: '261-123-4567', direccion: 'Calle Falsa 123', pedidos: 15 },
    2: { nombre: 'María González', email: 'maria.gonzalez@email.com', telefono: '261-987-6543', direccion: 'Av. San Martín 456', pedidos: 8 },
    3: { nombre: 'Carlos Rodríguez', email: 'carlos.r@email.com', telefono: '261-555-1234', direccion: 'Calle Las Heras 789', pedidos: 22 }
  };
  
  const usuario = usuarios[usuarioId];
  
  if (!usuario) {
    mostrarMensajeAdmin('Usuario no encontrado', 'error');
    return;
  }
  
  const modalHTML = `
    <div class="modal-overlay" id="modalVerUsuario">
      <div class="modal-contenido">
        <div class="modal-header">
          <h2>Información del Usuario</h2>
          <button class="btn-cerrar-modal" onclick="cerrarModalUsuario()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="usuario-detalle">
            <div class="usuario-avatar-grande">${usuario.nombre.split(' ').map(n => n[0]).join('')}</div>
            <h3>${usuario.nombre}</h3>
            <div class="usuario-info-detalle">
              <p><strong>Email:</strong> ${usuario.email}</p>
              <p><strong>Teléfono:</strong> ${usuario.telefono}</p>
              <p><strong>Dirección:</strong> ${usuario.direccion}</p>
              <p><strong>Pedidos realizados:</strong> ${usuario.pedidos}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cerrar-modal-footer" onclick="cerrarModalUsuario()">Cerrar</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function cerrarModalUsuario() {
  const modal = document.getElementById('modalVerUsuario');
  if (modal) {
    modal.remove();
  }
}

// ========================================
// FUNCIÓN PARA GENERAR REPORTE
// ========================================

function generarReporte() {
  mostrarMensajeAdmin('Generando reporte...', 'info');
  
  setTimeout(() => {
    const fecha = new Date().toLocaleDateString('es-AR');
    const nombreArchivo = `reporte_facturacion_${fecha.replace(/\//g, '-')}.pdf`;
    
    mostrarMensajeAdmin(`Reporte "${nombreArchivo}" generado correctamente`, 'success');
    
    console.log('Reporte generado:', nombreArchivo);
  }, 2000);
}

// ========================================
// FUNCIÓN PARA MOSTRAR MENSAJES
// ========================================

function mostrarMensajeAdmin(mensaje, tipo = 'info') {
  const mensajeHTML = `
    <div class="mensaje-flotante-admin mensaje-${tipo}" id="mensajeFlotanteAdmin">
      <p>${mensaje}</p>
    </div>
  `;
  
  const mensajeAnterior = document.getElementById('mensajeFlotanteAdmin');
  if (mensajeAnterior) {
    mensajeAnterior.remove();
  }
  
  document.body.insertAdjacentHTML('beforeend', mensajeHTML);
  
  setTimeout(() => {
    const mensaje = document.getElementById('mensajeFlotanteAdmin');
    if (mensaje) {
      mensaje.style.opacity = '0';
      mensaje.style.transform = 'translateX(100%)';
      setTimeout(() => mensaje.remove(), 300);
    }
  }, 3000);
}

// ========================================
// ESTILOS ADICIONALES
// ========================================

if (!document.getElementById('estilosAdmin')) {
  const estilos = `
    <style id="estilosAdmin">
      .usuario-detalle {
        text-align: center;
        padding: 4%;
      }
      
      .usuario-avatar-grande {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00b4d8 0%, #0096b8 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 2rem;
        margin: 0 auto 3%;
      }
      
      .usuario-detalle h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 4%;
      }
      
      .usuario-info-detalle {
        text-align: left;
        background-color: #f9f9f9;
        padding: 4%;
        border-radius: 10px;
      }
      
      .usuario-info-detalle p {
        margin: 2% 0;
        font-size: 1rem;
        color: #666;
      }
      
      .usuario-info-detalle strong {
        color: #333;
      }
      
      .mensaje-flotante-admin {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 3% 4%;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 11000;
        transition: all 0.3s ease;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }
      
      .mensaje-success {
        background-color: #28a745;
      }
      
      .mensaje-error {
        background-color: #dc3545;
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
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', estilos);
}