// ========================================
// PANEL REPARTIDOR - FUNCIONALIDAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('Panel Repartidor inicializado correctamente');
  actualizarContadorEntregas();
});

// ========================================
// FUNCIÓN PARA CONFIRMAR ENTREGA
// ========================================

function confirmarEntrega(pedidoId) {
  // Mostrar confirmación
  const confirmar = confirm('¿Confirmas que has entregado este pedido?');
  
  if (confirmar) {
    // Buscar el elemento de la entrega
    const entregaItem = document.querySelector(`.entrega-item button[onclick*="${pedidoId}"]`).closest('.entrega-item');
    
    // Agregar animación de salida
    entregaItem.style.transition = 'all 0.5s ease';
    entregaItem.style.opacity = '0';
    entregaItem.style.transform = 'translateX(100%)';
    
    // Eliminar después de la animación
    setTimeout(() => {
      entregaItem.remove();
      
      // Actualizar contador
      actualizarContadorEntregas();
      
      // Verificar si no quedan más entregas
      verificarEntregasRestantes();
      
      // Mostrar mensaje de éxito
      mostrarMensajeRepartidor('Entrega confirmada correctamente', 'success');
      
      // Aquí podrías enviar la confirmación a un servidor
      console.log('Entrega confirmada:', pedidoId);
      
      // Simular envío al servidor
      guardarEntregaEnServidor(pedidoId);
    }, 500);
  }
}

// ========================================
// FUNCIÓN PARA ACTUALIZAR CONTADOR
// ========================================

function actualizarContadorEntregas() {
  const entregas = document.querySelectorAll('.entrega-item');
  const contador = document.querySelector('.badge-count');
  
  if (contador) {
    const cantidad = entregas.length;
    contador.textContent = `${cantidad} pedido${cantidad !== 1 ? 's' : ''}`;
  }
}

// ========================================
// FUNCIÓN PARA VERIFICAR ENTREGAS RESTANTES
// ========================================

function verificarEntregasRestantes() {
  const entregas = document.querySelectorAll('.entrega-item');
  
  if (entregas.length === 0) {
    // Mostrar mensaje de que no hay más entregas
    const listaEntregas = document.querySelector('.entregas-lista');
    listaEntregas.innerHTML = `
      <div class="entregas-completadas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h3>¡Todas las entregas completadas!</h3>
        <p>No tienes entregas pendientes por el momento</p>
      </div>
    `;
  }
}

// ========================================
// FUNCIÓN PARA GUARDAR EN SERVIDOR (SIMULADO)
// ========================================

function guardarEntregaEnServidor(pedidoId) {
  // Datos de la entrega
  const entrega = {
    pedidoId: pedidoId,
    estado: 'entregado',
    fechaEntrega: new Date().toISOString(),
    repartidor: 'Usuario Actual'
  };
  
  // Simulación de envío al servidor
  console.log('Enviando al servidor:', entrega);
  
  // Aquí harías la petición real al servidor
  // fetch('/api/entregas/confirmar', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(entrega)
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Respuesta del servidor:', data);
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  //   mostrarMensajeRepartidor('Error al confirmar la entrega', 'error');
  // });
}

// ========================================
// FUNCIÓN PARA MOSTRAR MENSAJES
// ========================================

function mostrarMensajeRepartidor(mensaje, tipo = 'info') {
  const mensajeHTML = `
    <div class="mensaje-flotante-repartidor mensaje-${tipo}" id="mensajeFlotanteRepartidor">
      <p>${mensaje}</p>
    </div>
  `;
  
  // Eliminar mensajes anteriores
  const mensajeAnterior = document.getElementById('mensajeFlotanteRepartidor');
  if (mensajeAnterior) {
    mensajeAnterior.remove();
  }
  
  // Agregar el nuevo mensaje
  document.body.insertAdjacentHTML('beforeend', mensajeHTML);
  
  // Eliminar después de 3 segundos
  setTimeout(() => {
    const mensaje = document.getElementById('mensajeFlotanteRepartidor');
    if (mensaje) {
      mensaje.style.opacity = '0';
      mensaje.style.transform = 'translateX(100%)';
      setTimeout(() => mensaje.remove(), 300);
    }
  }, 3000);
}

// ========================================
// FUNCIÓN PARA LLAMAR AL CLIENTE
// ========================================

function llamarCliente(telefono) {
  // En un dispositivo móvil, esto abrirá la aplicación de teléfono
  window.location.href = `tel:${telefono}`;
}

// ========================================
// FUNCIÓN PARA ABRIR EN MAPS
// ========================================

function abrirEnMaps(direccion) {
  // Abrir Google Maps con la dirección
  const direccionEncoded = encodeURIComponent(direccion);
  window.open(`https://www.google.com/maps/search/?api=1&query=${direccionEncoded}`, '_blank');
}

// ========================================
// ESTILOS ADICIONALES (agregar dinámicamente)
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
      }
      
      .entregas-completadas h3 {
        font-size: clamp(1.5rem, 3vw, 2rem);
        margin-bottom: 2%;
      }
      
      .entregas-completadas p {
        font-size: clamp(1rem, 2vw, 1.2rem);
        color: #666;
      }
      
      .mensaje-flotante-repartidor {
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
      
      /* Estilo para hacer los teléfonos y direcciones clickeables */
      .entrega-telefono, .entrega-direccion {
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .entrega-telefono:hover, .entrega-direccion:hover {
        color: #00b4d8;
        text-decoration: underline;
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', estilos);
}

// ========================================
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