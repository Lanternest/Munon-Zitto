// PANEL ADMINISTRADOR - FUNCIONALIDAD
// ========================================

let productos = [];

document.addEventListener('DOMContentLoaded', function() {
  // Verificar autenticación y rol
  if (!estaAutenticado()) {
    window.location.href = '../html/login.html';
    return;
  }
  
  if (!verificarRol('ADMINISTRADOR')) {
    return;
  }
  
  // Cargar datos iniciales
  cargarProductos();
  cargarEstadisticas();
  
  console.log('Panel Administrador inicializado correctamente');
});

// CARGAR PRODUCTOS DESDE EL BACKEND
// ========================================

async function cargarProductos() {
  try {
    productos = await fetchAPI('/productos', {
      method: 'GET'
    });
    
    renderizarProductos();
    
  } catch (error) {
    console.error('Error al cargar productos:', error);
    mostrarMensajeAdmin('Error al cargar los productos', 'error');
  }
}

function renderizarProductos() {
  const tablaStock = document.getElementById('tablaStock');
  tablaStock.innerHTML = '';
  
  if (productos.length === 0) {
    tablaStock.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 20px; color: #666;">
          No hay productos registrados
        </td>
      </tr>
    `;
    return;
  }
  
  productos.forEach(producto => {
    const estadoStock = producto.stock > 10 ? 'En Stock' : 'Stock Bajo';
    const claseStock = producto.stock > 10 ? 'stock-ok' : 'stock-bajo';
    
    const fila = `
      <tr data-id="${producto.idProductos}">
        <td>${producto.nombre}</td>
        <td>${producto.descripcion || 'N/A'}</td>
        <td>${producto.stock} unidades</td>
        <td>$${producto.precio.toLocaleString('es-AR')}</td>
        <td><span class="${claseStock}">${estadoStock}</span></td>
        <td>
          <button class="btn-accion-editar" onclick="editarProducto(${producto.idProductos})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn-accion-eliminar" onclick="eliminarProducto(${producto.idProductos})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </td>
      </tr>
    `;
    
    tablaStock.innerHTML += fila;
  });
}

// CARGAR ESTADÍSTICAS
// ========================================

async function cargarEstadisticas() {
  try {
    // Cargar productos
    const productos = await fetchAPI('/productos', { method: 'GET' });
    document.querySelector('.stat-card:nth-child(4) h3').textContent = productos.length;
    
    // Cargar clientes
    const clientes = await fetchAPI('/admin/clientes', { method: 'GET' });
    document.querySelector('.stat-card:nth-child(3) h3').textContent = clientes.length;
    
    // Cargar pedidos
    const pedidos = await fetchAPI('/pedidos', { method: 'GET' });
    const pedidosHoy = pedidos.filter(p => {
      const fecha = new Date(p.fecha);
      const hoy = new Date();
      return fecha.toDateString() === hoy.toDateString();
    });
    
    document.querySelector('.stat-card:nth-child(1) h3').textContent = pedidosHoy.length;
    
    // Calcular ventas del día
    const ventasHoy = pedidosHoy.reduce((sum, p) => sum + parseFloat(p.precioTotal), 0);
    document.querySelector('.stat-card:nth-child(2) h3').textContent = `$${ventasHoy.toLocaleString('es-AR')}`;
    
  } catch (error) {
    console.error('Error al cargar estadísticas:', error);
  }
}

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
            <label for="descripcionProducto">Descripción:</label>
            <input type="text" id="descripcionProducto" placeholder="Ej: Bolsa 5kg" required>
          </div>
          <div class="form-group-modal">
            <label for="stockProducto">Stock:</label>
            <input type="number" id="stockProducto" min="0" required>
          </div>
          <div class="form-group-modal">
            <label for="precioProducto">Precio:</label>
            <input type="number" id="precioProducto" min="0" step="0.01" required>
          </div>
          <div class="form-group-modal">
            <label for="diasVencimiento">Días de Vencimiento:</label>
            <input type="number" id="diasVencimiento" min="1" required>
          </div>
          <div class="form-group-modal">
            <label for="categoriaProducto">Categoría:</label>
            <input type="text" id="categoriaProducto" placeholder="Ej: Panadería" required>
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
  
  document.getElementById('formAgregarProducto').addEventListener('submit', async function(e) {
    e.preventDefault();
    await guardarNuevoProducto();
  });
}

async function guardarNuevoProducto() {
  try {
    const nombre = document.getElementById('nombreProducto').value.trim();
    const descripcion = document.getElementById('descripcionProducto').value.trim();
    const stock = parseInt(document.getElementById('stockProducto').value);
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const diasVencimiento = parseInt(document.getElementById('diasVencimiento').value);
    const categoria = document.getElementById('categoriaProducto').value.trim();
    
    if (!nombre || !descripcion || isNaN(stock) || isNaN(precio) || isNaN(diasVencimiento) || !categoria) {
      mostrarMensajeAdmin('Por favor, complete todos los campos correctamente', 'error');
      return;
    }
    
    const nuevoProducto = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      diasVencimiento: diasVencimiento,
      categoria: categoria,
      estado: stock > 0 ? 'Disponible' : 'Agotado'
    };
    
    const btnGuardar = document.querySelector('#formAgregarProducto .btn-guardar-modal');
    btnGuardar.disabled = true;
    btnGuardar.textContent = 'Guardando...';
    
    const productoCreado = await fetchAPI('/productos', {
      method: 'POST',
      body: JSON.stringify(nuevoProducto)
    });
    
    cerrarModalProducto();
    mostrarMensajeAdmin('Producto agregado correctamente', 'success');
    
    // Recargar productos
    await cargarProductos();
    await cargarEstadisticas();
    
  } catch (error) {
    console.error('Error al agregar producto:', error);
    mostrarMensajeAdmin(error.message || 'Error al agregar el producto', 'error');
    
    const btnGuardar = document.querySelector('#formAgregarProducto .btn-guardar-modal');
    if (btnGuardar) {
      btnGuardar.disabled = false;
      btnGuardar.textContent = 'Agregar Producto';
    }
  }
}

function cerrarModalProducto() {
  const modal = document.getElementById('modalAgregarProducto');
  if (modal) {
    modal.remove();
  }
}

// FUNCIÓN PARA EDITAR PRODUCTO
// ========================================

async function editarProducto(productoId) {
  try {
    const producto = productos.find(p => p.idProductos === productoId);
    
    if (!producto) {
      mostrarMensajeAdmin('Producto no encontrado', 'error');
      return;
    }
    
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
              <input type="text" id="editNombreProducto" value="${producto.nombre}" required>
            </div>
            <div class="form-group-modal">
              <label for="editDescripcionProducto">Descripción:</label>
              <input type="text" id="editDescripcionProducto" value="${producto.descripcion || ''}" required>
            </div>
            <div class="form-group-modal">
              <label for="editStockProducto">Stock:</label>
              <input type="number" id="editStockProducto" value="${producto.stock}" min="0" required>
            </div>
            <div class="form-group-modal">
              <label for="editPrecioProducto">Precio:</label>
              <input type="number" id="editPrecioProducto" value="${producto.precio}" min="0" step="0.01" required>
            </div>
            <div class="form-group-modal">
              <label for="editDiasVencimiento">Días de Vencimiento:</label>
              <input type="number" id="editDiasVencimiento" value="${producto.diasVencimiento}" min="1" required>
            </div>
            <div class="form-group-modal">
              <label for="editCategoriaProducto">Categoría:</label>
              <input type="text" id="editCategoriaProducto" value="${producto.categoria || ''}" required>
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
    
    document.getElementById('formEditarProducto').addEventListener('submit', async function(e) {
      e.preventDefault();
      await guardarEdicionProducto(productoId);
    });
    
  } catch (error) {
    console.error('Error al cargar producto:', error);
    mostrarMensajeAdmin('Error al cargar el producto', 'error');
  }
}

async function guardarEdicionProducto(productoId) {
  try {
    const nombre = document.getElementById('editNombreProducto').value.trim();
    const descripcion = document.getElementById('editDescripcionProducto').value.trim();
    const stock = parseInt(document.getElementById('editStockProducto').value);
    const precio = parseFloat(document.getElementById('editPrecioProducto').value);
    const diasVencimiento = parseInt(document.getElementById('editDiasVencimiento').value);
    const categoria = document.getElementById('editCategoriaProducto').value.trim();
    
    if (!nombre || !descripcion || isNaN(stock) || isNaN(precio) || isNaN(diasVencimiento) || !categoria) {
      mostrarMensajeAdmin('Por favor, complete todos los campos correctamente', 'error');
      return;
    }
    
    const productoActualizado = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      stock: stock,
      diasVencimiento: diasVencimiento,
      categoria: categoria,
      estado: stock > 0 ? 'Disponible' : 'Agotado'
    };
    
    const btnGuardar = document.querySelector('#formEditarProducto .btn-guardar-modal');
    btnGuardar.disabled = true;
    btnGuardar.textContent = 'Guardando...';
    
    await fetchAPI(`/productos/${productoId}`, {
      method: 'PUT',
      body: JSON.stringify(productoActualizado)
    });
    
    cerrarModalEditar();
    mostrarMensajeAdmin('Producto actualizado correctamente', 'success');
    
    await cargarProductos();
    
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    mostrarMensajeAdmin(error.message || 'Error al actualizar el producto', 'error');
    
    const btnGuardar = document.querySelector('#formEditarProducto .btn-guardar-modal');
    if (btnGuardar) {
      btnGuardar.disabled = false;
      btnGuardar.textContent = 'Guardar Cambios';
    }
  }
}

function cerrarModalEditar() {
  const modal = document.getElementById('modalEditarProducto');
  if (modal) {
    modal.remove();
  }
}

// FUNCIÓN PARA ELIMINAR PRODUCTO
// ========================================

async function eliminarProducto(productoId) {
  if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    return;
  }
  
  try {
    await fetchAPI(`/productos/${productoId}`, {
      method: 'DELETE'
    });
    
    mostrarMensajeAdmin('Producto eliminado correctamente', 'success');
    
    await cargarProductos();
    await cargarEstadisticas();
    
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    mostrarMensajeAdmin(error.message || 'Error al eliminar el producto', 'error');
  }
}

// FUNCIÓN PARA VER USUARIO
// ========================================

async function verUsuario(usuarioId) {
  try {
    const clientes = await fetchAPI('/admin/clientes', { method: 'GET' });
    const cliente = clientes[usuarioId - 1]; // Ajustar según tu lógica
    
    if (!cliente) {
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
              <div class="usuario-avatar-grande">${cliente.nombre.charAt(0)}${cliente.apellido.charAt(0)}</div>
              <h3>${cliente.nombre} ${cliente.apellido}</h3>
              <div class="usuario-info-detalle">
                <p><strong>DNI:</strong> ${cliente.dni}</p>
                <p><strong>Email:</strong> ${cliente.email}</p>
                <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
                <p><strong>Dirección:</strong> ${cliente.direccion}</p>
                <p><strong>Código Postal:</strong> ${cliente.codigoPostal}</p>
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
    
  } catch (error) {
    console.error('Error al cargar usuario:', error);
    mostrarMensajeAdmin('Error al cargar el usuario', 'error');
  }
}

function cerrarModalUsuario() {
  const modal = document.getElementById('modalVerUsuario');
  if (modal) {
    modal.remove();
  }
}

// FUNCIÓN PARA GENERAR REPORTE
// ========================================

async function generarReporte() {
  mostrarMensajeAdmin('Generando reporte...', 'info');
  
  try {
    const pedidos = await fetchAPI('/pedidos', { method: 'GET' });
    const fecha = new Date().toLocaleDateString('es-AR');
    const nombreArchivo = `reporte_${fecha.replace(/\//g, '-')}.json`;
    
    // Crear blob y descargar
    const blob = new Blob([JSON.stringify(pedidos, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    mostrarMensajeAdmin(`Reporte "${nombreArchivo}" generado correctamente`, 'success');
    
  } catch (error) {
    console.error('Error al generar reporte:', error);
    mostrarMensajeAdmin('Error al generar el reporte', 'error');
  }
}

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

// Hacer funciones globales
window.agregarProducto = agregarProducto;
window.editarProducto = editarProducto;
window.eliminarProducto = eliminarProducto;
window.verUsuario = verUsuario;
window.generarReporte = generarReporte;
window.cerrarModalProducto = cerrarModalProducto;
window.cerrarModalEditar = cerrarModalEditar;
window.cerrarModalUsuario = cerrarModalUsuario;

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