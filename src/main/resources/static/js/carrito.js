// CARRITO DE COMPRAS - FUNCIONALIDAD COMPLETA
// ========================================

let carrito = [];
let productosDisponibles = [];

// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', async function() {
  // Cargar carrito desde localStorage
  cargarCarrito();
  
  // Cargar productos disponibles del backend
  await cargarProductosDisponibles();
  
  // Renderizar el carrito
  renderizarCarrito();
  
  // Configurar event listeners
  configurarEventListeners();
});

// CARGAR PRODUCTOS DISPONIBLES
// ========================================

async function cargarProductosDisponibles() {
  try {
    productosDisponibles = await fetchAPI('/productos', {
      method: 'GET'
    });
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

// FUNCIONES PARA GESTIONAR EL CARRITO
// ========================================

function agregarProducto(producto, cantidad = 1) {
  const productoExistente = carrito.find(item => item.id === producto.id);
  
  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({
      ...producto,
      cantidad: cantidad
    });
  }
  
  guardarCarrito();
  renderizarCarrito();
  mostrarAlerta('Producto agregado al carrito', 'success');
}

function eliminarProducto(productoId) {
  carrito = carrito.filter(item => item.id !== productoId);
  guardarCarrito();
  renderizarCarrito();
  mostrarAlerta('Producto eliminado del carrito', 'info');
}

function actualizarCantidad(productoId, nuevaCantidad) {
  const producto = carrito.find(item => item.id === productoId);
  
  if (producto) {
    if (nuevaCantidad <= 0) {
      eliminarProducto(productoId);
      return;
    }
    
    producto.cantidad = nuevaCantidad;
    guardarCarrito();
    renderizarCarrito();
  }
}

function vaciarCarrito() {
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
    mostrarAlerta('Carrito vaciado', 'info');
  }
}

// FUNCIONES DE RENDERIZADO
// ========================================

function renderizarCarrito() {
  const productosLista = document.getElementById('productosLista');
  const carritoVacio = document.getElementById('carritoVacio');
  
  productosLista.innerHTML = '';
  
  if (carrito.length === 0) {
    productosLista.style.display = 'none';
    carritoVacio.style.display = 'flex';
    document.getElementById('btnVaciarCarrito').style.display = 'none';
  } else {
    productosLista.style.display = 'block';
    carritoVacio.style.display = 'none';
    document.getElementById('btnVaciarCarrito').style.display = 'flex';
    
    carrito.forEach(producto => {
      const productoHTML = crearProductoHTML(producto);
      productosLista.innerHTML += productoHTML;
    });
    
    configurarBotonesProductos();
  }
  
  actualizarResumen();
}

function crearProductoHTML(producto) {
  const subtotal = producto.precio * producto.cantidad;
  
  return `
    <div class="producto-item" data-id="${producto.id}">
      <div class="producto-info-carrito">
        <h4>${producto.nombre}</h4>
        <p>${producto.peso}</p>
      </div>
      
      <div class="producto-precio-unitario">
        $${producto.precio.toLocaleString('es-AR')}
      </div>
      
      <div class="producto-cantidad">
        <button class="btn-cantidad btn-restar" data-id="${producto.id}">-</button>
        <span class="cantidad-numero">${producto.cantidad}</span>
        <button class="btn-cantidad btn-sumar" data-id="${producto.id}">+</button>
      </div>
      
      <div class="producto-subtotal-eliminar">
        <div class="producto-subtotal">$${subtotal.toLocaleString('es-AR')}</div>
        <button class="btn-eliminar-producto" data-id="${producto.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  `;
}

function actualizarResumen() {
  const subtotal = carrito.reduce((total, producto) => {
    return total + (producto.precio * producto.cantidad);
  }, 0);
  
  document.getElementById('subtotalPrecio').textContent = `$${subtotal.toLocaleString('es-AR')}`;
  document.getElementById('totalPrecio').textContent = `$${subtotal.toLocaleString('es-AR')}`;
}

// CONFIGURAR EVENT LISTENERS
// ========================================

function configurarEventListeners() {
  const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');
  if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener('click', vaciarCarrito);
  }
  
  const btnFinalizarPedido = document.getElementById('btnFinalizarPedido');
  if (btnFinalizarPedido) {
    btnFinalizarPedido.addEventListener('click', finalizarPedido);
  }
}

function configurarBotonesProductos() {
  document.querySelectorAll('.btn-sumar').forEach(btn => {
    btn.addEventListener('click', function() {
      const productoId = parseInt(this.getAttribute('data-id'));
      const producto = carrito.find(item => item.id === productoId);
      if (producto) {
        actualizarCantidad(productoId, producto.cantidad + 1);
      }
    });
  });
  
  document.querySelectorAll('.btn-restar').forEach(btn => {
    btn.addEventListener('click', function() {
      const productoId = parseInt(this.getAttribute('data-id'));
      const producto = carrito.find(item => item.id === productoId);
      if (producto) {
        actualizarCantidad(productoId, producto.cantidad - 1);
      }
    });
  });
  
  document.querySelectorAll('.btn-eliminar-producto').forEach(btn => {
    btn.addEventListener('click', function() {
      const productoId = parseInt(this.getAttribute('data-id'));
      eliminarProducto(productoId);
    });
  });
}

// FINALIZAR PEDIDO
// ========================================

async function finalizarPedido() {
  // Verificar autenticación
  if (!estaAutenticado()) {
    mostrarAlerta('Debes iniciar sesión para realizar un pedido', 'error');
    setTimeout(() => {
      window.location.href = '../html/login.html';
    }, 2000);
    return;
  }
  
  // Validar que haya productos en el carrito
  if (carrito.length === 0) {
    mostrarAlerta('Tu carrito está vacío. Agrega productos para continuar.', 'error');
    return;
  }
  
  // Obtener datos del formulario
  const direccion = document.getElementById('direccion').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const observaciones = document.getElementById('observaciones').value.trim();
  const metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;
  
  // Validar campos obligatorios
  if (!direccion || !telefono) {
    mostrarAlerta('Por favor, completa todos los campos obligatorios.', 'error');
    return;
  }
  
  try {
    const sesion = obtenerSesion();
    const dni = sesion.dni;
    
    if (!dni) {
      mostrarAlerta('No se pudo obtener tu información de usuario', 'error');
      return;
    }
    
    // Preparar los detalles del pedido
    const detalles = carrito.map(producto => ({
      idProductos: producto.id,
      cantidad: producto.cantidad,
      precioUnitario: producto.precio,
      subtotal: producto.precio * producto.cantidad,
      idPromo: null // Sin promoción por ahora
    }));
    
    // Crear objeto del pedido
    const pedidoData = {
      dni: dni,
      direccionEntrega: direccion,
      observaciones: observaciones,
      detalles: detalles
    };
    
    // Deshabilitar botón mientras se procesa
    const btnFinalizar = document.getElementById('btnFinalizarPedido');
    btnFinalizar.disabled = true;
    btnFinalizar.textContent = 'Procesando...';
    
    // Enviar pedido al backend
    const pedidoCreado = await fetchAPI('/pedidos', {
      method: 'POST',
      body: JSON.stringify(pedidoData)
    });
    
    console.log('Pedido creado:', pedidoCreado);
    
    // Procesar pago
    const formaPagoBackend = convertirFormaPago(metodoPago);
    const pagoCreado = await fetchAPI(`/pedidos/${pedidoCreado.idPedido}/pago?formaPago=${formaPagoBackend}`, {
      method: 'POST'
    });
    
    console.log('Pago procesado:', pagoCreado);
    
    // Mostrar mensaje de éxito
    mostrarAlerta('¡Pedido realizado con éxito! Redirigiendo a tus pedidos...', 'success');
    
    // Vaciar el carrito
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
    
    // Limpiar el formulario
    document.getElementById('formEntrega').reset();
    
    // Redirigir al panel de cliente después de 3 segundos
    setTimeout(() => {
      window.location.href = '../html/panel-cliente.html';
    }, 3000);
    
  } catch (error) {
    console.error('Error al finalizar pedido:', error);
    mostrarAlerta(error.message || 'Error al procesar el pedido. Por favor, intenta nuevamente.', 'error');
    
    // Rehabilitar botón
    const btnFinalizar = document.getElementById('btnFinalizarPedido');
    btnFinalizar.disabled = false;
    btnFinalizar.textContent = 'Finalizar Pedido';
  }
}

function convertirFormaPago(metodoPago) {
  const mapeo = {
    'efectivo': 'Efectivo',
    'transferencia': 'Transferencia',
    'tarjeta': 'Tarjeta_Credito'
  };
  return mapeo[metodoPago] || 'Efectivo';
}

// PERSISTENCIA (LOCAL STORAGE)
// ========================================

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

// MOSTRAR ALERTAS
// ========================================

function mostrarAlerta(mensaje, tipo = 'info') {
  const alerta = document.getElementById('carritoAlerta');
  const mensajeAlerta = document.getElementById('mensajeAlerta');
  
  mensajeAlerta.textContent = mensaje;
  
  switch(tipo) {
    case 'success':
      alerta.style.backgroundColor = '#28a745';
      break;
    case 'error':
      alerta.style.backgroundColor = '#ff4444';
      break;
    case 'info':
      alerta.style.backgroundColor = '#00b4d8';
      break;
  }
  
  alerta.style.display = 'block';
  
  setTimeout(() => {
    alerta.style.display = 'none';
  }, 4000);
}

// FUNCIONES PÚBLICAS (PARA USAR DESDE PRODUCTOS.HTML)
// ========================================

window.agregarAlCarrito = function(productoId, nombre, peso, precio, imagen) {
  const producto = {
    id: productoId,
    nombre: nombre,
    peso: peso,
    precio: precio,
    imagen: imagen
  };
  
  agregarProducto(producto, 1);
};

console.log('Carrito de compras inicializado correctamente');