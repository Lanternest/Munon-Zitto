// PRODUCTOS - FUNCIONALIDAD
// ========================================

let productos = [];

document.addEventListener('DOMContentLoaded', async function() {
  await cargarProductos();
});

// CARGAR PRODUCTOS DESDE EL BACKEND
// ========================================

async function cargarProductos() {
  try {
    productos = await fetchAPI('/productos', {
      method: 'GET'
    });
    
    // Filtrar solo productos disponibles
    productos = productos.filter(p => p.estado === 'Disponible' && p.stock > 0);
    
    renderizarProductos();
    
  } catch (error) {
    console.error('Error al cargar productos:', error);
    mostrarError('Error al cargar los productos');
  }
}

// RENDERIZAR PRODUCTOS
// ========================================

function renderizarProductos() {
  const productosGrid = document.querySelector('.productos-grid');
  if (!productosGrid) {
    console.warn('No se encontró el contenedor de productos');
    return;
  }
  
  productosGrid.innerHTML = '';
  
  if (productos.length === 0) {
    productosGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
        <p style="font-size: 1.2rem;">No hay productos disponibles en este momento</p>
      </div>
    `;
    return;
  }
  
  productos.forEach(producto => {
    const imagenUrl = producto.imagenUrl || '../imagenes/img-producto/factura-tarjeta.jpg';
    const iconoUrl = obtenerIconoPorCategoria(producto.categoria);
    const precioFormateado = producto.precio.toLocaleString('es-AR', { 
      style: 'currency', 
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    const productoCard = `
      <div class="producto-card">
        <div class="producto-imagen">
          <img src="${imagenUrl}" alt="${producto.nombre}" onerror="this.src='../imagenes/img-producto/factura-tarjeta.jpg'">
          ${iconoUrl ? `<div class="producto-icono">
            <img src="${iconoUrl}" alt="Icono ${producto.nombre}">
          </div>` : ''}
        </div>
        <div class="producto-info">
          <h3>${producto.nombre}</h3>
          <p class="producto-peso">${producto.descripcion || 'Sin descripción'}</p>
          <div class="producto-botones">
            <button onclick="agregarAlCarrito(${producto.idProductos}, '${producto.nombre}', '${producto.descripcion || ''}', ${producto.precio}, '${imagenUrl}')">
              COMPRAR
            </button>
            <button class="btn-detalle">${precioFormateado}</button>
          </div>
        </div>
      </div>
    `;
    
    productosGrid.innerHTML += productoCard;
  });
}

// FUNCIÓN AUXILIAR PARA OBTENER ICONO POR CATEGORÍA
// ========================================

function obtenerIconoPorCategoria(categoria) {
  if (!categoria) return null;
  
  const categoriaLower = categoria.toLowerCase();
  
  if (categoriaLower.includes('factura') || categoriaLower.includes('medialuna')) {
    return '../imagenes/img-producto/factura-icono.png';
  } else if (categoriaLower.includes('torta')) {
    return '../imagenes/img-producto/torta-icono.png';
  } else if (categoriaLower.includes('canela') || categoriaLower.includes('roll')) {
    return '../imagenes/img-producto/rolldecanela-icono.png';
  } else if (categoriaLower.includes('croissant')) {
    return '../imagenes/img-producto/croassant-icono.png';
  } else if (categoriaLower.includes('chipa')) {
    return '../imagenes/img-producto/chipa-icono.png';
  }
  
  return null;
}

// FUNCIÓN PARA MOSTRAR ERRORES
// ========================================

function mostrarError(mensaje) {
  const alertaHTML = `
    <div class="alerta-flotante alerta-error" id="alertaProductos">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; margin-right: 10px;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
      <p>${mensaje}</p>
    </div>
  `;
  
  eliminarAlertaAnterior();
  document.body.insertAdjacentHTML('beforeend', alertaHTML);
  
  setTimeout(() => {
    const alerta = document.getElementById('alertaProductos');
    if (alerta) {
      alerta.style.opacity = '0';
      alerta.style.transform = 'translateY(-20px)';
      setTimeout(() => alerta.remove(), 300);
    }
  }, 4000);
}

function eliminarAlertaAnterior() {
  const alertaAnterior = document.getElementById('alertaProductos');
  if (alertaAnterior) {
    alertaAnterior.remove();
  }
}

// ESTILOS PARA ALERTAS
// ========================================

if (!document.getElementById('estilosAlertasProductos')) {
  const estilos = `
    <style id="estilosAlertasProductos">
      .alerta-flotante {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 11000;
        display: flex;
        align-items: center;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease;
        transition: all 0.3s ease;
      }
      
      .alerta-error {
        background-color: #ff4444;
      }
      
      .alerta-flotante p {
        margin: 0;
        flex: 1;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
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

