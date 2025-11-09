// ========================================
// CARRITO DE COMPRAS - FUNCIONALIDAD COMPLETA
// ========================================

// Array para almacenar los productos del carrito (simulado)
let carrito = [];

// Productos de ejemplo para simular
const productosEjemplo = [
  {
    id: 1,
    nombre: 'Medialunas',
    peso: 'Bolsa 5kg',
    precio: 5500,
    imagen: '/imagenes/img-producto/medialunas.jpg'
  },
   {
    id: 2,
    nombre: 'Medialunas',
    peso: 'Bolsa 8kg',
    precio: 7500,
    imagen: '/imagenes/img-producto/medialunas.jpg'
  },
     {
    id: 3,
    nombre: 'Medialunas',
    peso: 'Bolsa 10kg',
    precio: 9500,
    imagen: '/imagenes/img-producto/medialunas.jpg'
  },
  {
    id: 4,
    nombre: 'Tortas',
    peso: 'Bolsa 5kg',
    precio: 4500,
    imagen: '/imagenes/img-producto/tortas.jpg'
  },
  {
    id: 5,
    nombre: 'Tortas',
    peso: 'Bolsa 8kg',
    precio: 5500,
    imagen: '/imagenes/img-producto/tortas.jpg'
  },
  {
    id: 6,
    nombre: 'Tortas',
    peso: 'Bolsa 10kg',
    precio: 6500,
    imagen: '/imagenes/img-producto/tortas.jpg'
  },
  {
    id: 7,
    nombre: 'Roll de Canela',
    peso: 'Docena',
    precio: 8000,
    imagen: '/imagenes/img-producto/rolls.jpg'
  },
    {
    id: 8,
    nombre: 'Croissant',
    peso: 'Docena',
    precio: 7500,
    imagen: '/imagenes/img-producto/rolls.jpg'
  },
    {
    id: 9,
    nombre: 'Chipa',
    peso: 'Docena',
    precio: 4500,
    imagen: '/imagenes/img-producto/rolls.jpg'
  }
];

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Cargar carrito desde localStorage o usar productos de ejemplo
  cargarCarrito();
  
  // Si el carrito está vacío, agregar productos de ejemplo para demostración
  if (carrito.length === 0) {
    // Puedes comentar estas líneas si no quieres productos precargados
   // agregarProducto(productosEjemplo[0], 0);
    //agregarProducto(productosEjemplo[1], 0);
    //agregarProducto(productosEjemplo[2], 0);
    //agregarProducto(productosEjemplo[3], 0);
    //agregarProducto(productosEjemplo[4], 0);
    //agregarProducto(productosEjemplo[5], 0);
    //agregarProducto(productosEjemplo[6], 0);
    //agregarProducto(productosEjemplo[7], 0);
    //agregarProducto(productosEjemplo[8], 0);
  }
  
  // Renderizar el carrito
  renderizarCarrito();
  
  // Configurar event listeners
  configurarEventListeners();
});

// ========================================
// FUNCIONES PARA GESTIONAR EL CARRITO
// ========================================

// Agregar producto al carrito
function agregarProducto(producto, cantidad = 1) {
  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.id === producto.id);
  
  if (productoExistente) {
    // Si ya existe, aumentar la cantidad
    productoExistente.cantidad += cantidad;
  } else {
    // Si no existe, agregarlo
    carrito.push({
      ...producto,
      cantidad: cantidad
    });
  }
  
  // Guardar en localStorage
  guardarCarrito();
  
  // Renderizar de nuevo
  renderizarCarrito();
  
  // Mostrar mensaje
  mostrarAlerta('Producto agregado al carrito', 'success');
}

// Eliminar producto del carrito
function eliminarProducto(productoId) {
  // Filtrar el producto que se quiere eliminar
  carrito = carrito.filter(item => item.id !== productoId);
  
  // Guardar en localStorage
  guardarCarrito();
  
  // Renderizar de nuevo
  renderizarCarrito();
  
  // Mostrar mensaje
  mostrarAlerta('Producto eliminado del carrito', 'info');
}

// Actualizar cantidad de un producto
function actualizarCantidad(productoId, nuevaCantidad) {
  // Encontrar el producto
  const producto = carrito.find(item => item.id === productoId);
  
  if (producto) {
    // Si la cantidad es 0 o menor, eliminar el producto
    if (nuevaCantidad <= 0) {
      eliminarProducto(productoId);
      return;
    }
    
    // Actualizar la cantidad
    producto.cantidad = nuevaCantidad;
    
    // Guardar en localStorage
    guardarCarrito();
    
    // Renderizar de nuevo
    renderizarCarrito();
  }
}

// Vaciar todo el carrito
function vaciarCarrito() {
  // Confirmar con el usuario
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    // Vaciar el array
    carrito = [];
    
    // Guardar en localStorage
    guardarCarrito();
    
    // Renderizar de nuevo
    renderizarCarrito();
    
    // Mostrar mensaje
    mostrarAlerta('Carrito vaciado', 'info');
  }
}

// ========================================
// FUNCIONES DE RENDERIZADO
// ========================================

function renderizarCarrito() {
  const productosLista = document.getElementById('productosLista');
  const carritoVacio = document.getElementById('carritoVacio');
  
  // Limpiar la lista
  productosLista.innerHTML = '';
  
  // Si el carrito está vacío
  if (carrito.length === 0) {
    productosLista.style.display = 'none';
    carritoVacio.style.display = 'flex';
    document.getElementById('btnVaciarCarrito').style.display = 'none';
  } else {
    productosLista.style.display = 'block';
    carritoVacio.style.display = 'none';
    document.getElementById('btnVaciarCarrito').style.display = 'flex';
    
    // Renderizar cada producto
    carrito.forEach(producto => {
      const productoHTML = crearProductoHTML(producto);
      productosLista.innerHTML += productoHTML;
    });
    
    // Configurar los botones de cada producto
    configurarBotonesProductos();
  }
  
  // Actualizar el resumen
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
        ${producto.precio.toLocaleString('es-AR')}
      </div>
      
      <div class="producto-cantidad">
        <button class="btn-cantidad btn-restar" data-id="${producto.id}">-</button>
        <span class="cantidad-numero">${producto.cantidad}</span>
        <button class="btn-cantidad btn-sumar" data-id="${producto.id}">+</button>
      </div>
      
      <div class="producto-subtotal-eliminar">
        <div class="producto-subtotal">${subtotal.toLocaleString('es-AR')}</div>
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
  // Calcular subtotal
  const subtotal = carrito.reduce((total, producto) => {
    return total + (producto.precio * producto.cantidad);
  }, 0);
  
  // Actualizar el DOM
  document.getElementById('subtotalPrecio').textContent = `$${subtotal.toLocaleString('es-AR')}`;
  document.getElementById('totalPrecio').textContent = `$${subtotal.toLocaleString('es-AR')}`;
}

// ========================================
// CONFIGURAR EVENT LISTENERS
// ========================================

function configurarEventListeners() {
  // Botón vaciar carrito
  const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');
  if (btnVaciarCarrito) {
    btnVaciarCarrito.addEventListener('click', vaciarCarrito);
  }
  
  // Botón finalizar pedido
  const btnFinalizarPedido = document.getElementById('btnFinalizarPedido');
  if (btnFinalizarPedido) {
    btnFinalizarPedido.addEventListener('click', finalizarPedido);
  }
}

function configurarBotonesProductos() {
  // Botones de sumar cantidad
  document.querySelectorAll('.btn-sumar').forEach(btn => {
    btn.addEventListener('click', function() {
      const productoId = parseInt(this.getAttribute('data-id'));
      const producto = carrito.find(item => item.id === productoId);
      if (producto) {
        actualizarCantidad(productoId, producto.cantidad + 1);
      }
    });
  });
  
  // Botones de restar cantidad
  document.querySelectorAll('.btn-restar').forEach(btn => {
    btn.addEventListener('click', function() {
      const productoId = parseInt(this.getAttribute('data-id'));
      const producto = carrito.find(item => item.id === productoId);
      if (producto) {
        actualizarCantidad(productoId, producto.cantidad - 1);
      }
    });
  });
  
  // Botones de eliminar producto
  document.querySelectorAll('.btn-eliminar-producto').forEach(btn => {
    btn.addEventListener('click', function() {
      const productoId = parseInt(this.getAttribute('data-id'));
      eliminarProducto(productoId);
    });
  });
}

// ========================================
// FINALIZAR PEDIDO
// ========================================

function finalizarPedido() {
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
  
  // Calcular total
  const total = carrito.reduce((sum, producto) => {
    return sum + (producto.precio * producto.cantidad);
  }, 0);
  
  // Crear objeto del pedido
  const pedido = {
    productos: carrito,
    direccion: direccion,
    telefono: telefono,
    observaciones: observaciones,
    metodoPago: metodoPago,
    total: total,
    fecha: new Date().toLocaleString('es-AR')
  };
  
  // Aquí enviarías el pedido a un servidor
  console.log('Pedido realizado:', pedido);
  
  // Mostrar mensaje de éxito
  mostrarAlerta('¡Pedido realizado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
  
  // Vaciar el carrito
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
  
  // Limpiar el formulario
  document.getElementById('formEntrega').reset();
  
  // Opcional: redirigir a otra página después de 3 segundos
  // setTimeout(() => {
  //   window.location.href = '/index.html';
  // }, 3000);
}

// ========================================
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

// ========================================
// MOSTRAR ALERTAS
// ========================================

function mostrarAlerta(mensaje, tipo = 'info') {
  const alerta = document.getElementById('carritoAlerta');
  const mensajeAlerta = document.getElementById('mensajeAlerta');
  
  // Configurar el mensaje
  mensajeAlerta.textContent = mensaje;
  
  // Configurar el color según el tipo
  switch(tipo) {
    case 'success':
      alerta.style.backgroundColor = '#00b4d8';
      break;
    case 'error':
      alerta.style.backgroundColor = '#ff4444';
      break;
    case 'info':
      alerta.style.backgroundColor = '#666';
      break;
  }
  
  // Mostrar la alerta
  alerta.style.display = 'block';
  
  // Ocultar después de 3 segundos
  setTimeout(() => {
    alerta.style.display = 'none';
  }, 3000);
}

// ========================================
// FUNCIONES PÚBLICAS (PARA USAR DESDE PRODUCTOS.HTML)
// ========================================

// Función global para agregar desde la página de productos
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