// FUNCIÓN PARA MOSTRAR/OCULTAR CONTRASEÑA
// ========================================

function togglePassword(inputId) {
  // Obtiene el campo de contraseña por su ID
  const passwordInput = document.getElementById(inputId);
  
  // Obtiene el botón del ojo (icono)
  const toggleButton = passwordInput.nextElementSibling;
  
  // Cambia el tipo de input entre 'password' y 'text'
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text'; // Muestra la contraseña
  } else {
    passwordInput.type = 'password'; // Oculta la contraseña
  }
}

// VALIDACIÓN DEL FORMULARIO
// ========================================

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  
  // Limpiar cualquier sesión anterior al cargar la página de registro
  // Esto asegura que no se muestren datos de un usuario anterior
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('email');
  localStorage.removeItem('dni');
  
  // Obtiene el formulario
  const form = document.getElementById('formRegistro');
  
  // Escucha el evento de envío del formulario
  form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Previene el envío por defecto
    
    // Obtiene los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // VALIDACIONES
    // ========================================
    
    // Valida que todos los campos estén llenos
    if (!nombre || !apellido || !telefono || !email || !password || !confirmPassword) {
      mostrarError('Por favor, complete todos los campos');
      return;
    }
    
    // Valida que el nombre tenga al menos 2 caracteres
    if (nombre.length < 2) {
      mostrarError('El nombre debe tener al menos 2 caracteres');
      return;
    }
    
    // Valida que el apellido tenga al menos 2 caracteres
    if (apellido.length < 2) {
      mostrarError('El apellido debe tener al menos 2 caracteres');
      return;
    }
    
    // Valida formato de teléfono (solo números y entre 8-15 dígitos)
    const telefonoRegex = /^[0-9]{8,15}$/;
    if (!telefonoRegex.test(telefono.replace(/[\s-]/g, ''))) {
      mostrarError('Por favor, ingrese un número de teléfono válido (8-15 dígitos)');
      return;
    }
    
    // Valida formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarError('Por favor, ingrese un email válido');
      return;
    }
    
    // Valida que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      mostrarError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Valida que las contraseñas coincidan
    if (password !== confirmPassword) {
      mostrarError('Las contraseñas no coinciden');
      return;
    }
    
    // SI TODAS LAS VALIDACIONES PASAN
    // ========================================
    
	const registroData = {
	  dni: document.getElementById('dni').value.trim(),
	  nombre: nombre,
	  apellido: apellido,
	  direccion: document.getElementById('direccion').value.trim(),
	  telefono: telefono,
	  email: email,
	  contrasenia: password,
	  codigoPostal: parseInt(document.getElementById('codigoPostal').value)
	};
	    
	    try {
	      // Deshabilitar botón mientras se procesa
	      const btnSubmit = form.querySelector('button[type="submit"]');
	      btnSubmit.disabled = true;
	      btnSubmit.textContent = 'Registrando...';
	      
	      // Llamar al backend
	      const response = await fetchAPI('/auth/register', {
	        method: 'POST',
	        body: JSON.stringify(registroData)
	      });
	    
    // Muestra mensaje de éxito
    mostrarExito('¡Registro exitoso! Bienvenido ' + nombre + ' ' + apellido);
        
    // Limpia el formulario
    form.reset();
    
    // Limpiar cualquier sesión anterior antes de redirigir
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('email');
    localStorage.removeItem('dni');
    
	// Redirigir al login
	      setTimeout(() => {
	        window.location.href = '../html/login.html';
	      }, 2000);
	      
	    } catch (error) {
	      console.error('Error en registro:', error);
	      mostrarError(error.message || 'Error al registrar. Por favor, intente nuevamente.');
	      
	      // Rehabilitar botón
	      const btnSubmit = form.querySelector('button[type="submit"]');
	      btnSubmit.disabled = false;
	      btnSubmit.textContent = 'Registrarme';
	    }
	  });
  
  // VALIDACIÓN EN TIEMPO REAL
  // ========================================
  
  // Validación del campo de confirmación de contraseña en tiempo real
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  
  confirmPasswordInput.addEventListener('input', function() {
    // Si las contraseñas no coinciden, muestra un mensaje
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
    } else {
      confirmPasswordInput.setCustomValidity('');
    }
  });
  
  // FORMATO AUTOMÁTICO DEL TELÉFONO
  // ========================================
  
  const telefonoInput = document.getElementById('telefono');
  
  telefonoInput.addEventListener('input', function(e) {
    // Elimina todo lo que no sea número
    let value = e.target.value.replace(/\D/g, '');
    
    // Limita a 15 dígitos
    if (value.length > 15) {
      value = value.slice(0, 15);
    }
    
    // Actualiza el valor del input
    e.target.value = value;
  });
});

// FUNCIÓN PARA LIMPIAR EL FORMULARIO
// ========================================

function limpiarFormulario() {
  document.getElementById('formRegistro').reset();
}

// FUNCIONES AUXILIARES
// ========================================

function generarDNITemporal() {
  // Generar un DNI temporal (8 dígitos)
  // En producción, esto debería venir de un campo en el formulario
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

function mostrarError(mensaje) {
  const alertaHTML = `
    <div class="alerta-flotante alerta-error" id="alertaFlotante">
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
    const alerta = document.getElementById('alertaFlotante');
    if (alerta) {
      alerta.style.opacity = '0';
      alerta.style.transform = 'translateY(-20px)';
      setTimeout(() => alerta.remove(), 300);
    }
  }, 4000);
}

function mostrarExito(mensaje) {
  const alertaHTML = `
    <div class="alerta-flotante alerta-exito" id="alertaFlotante">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px; margin-right: 10px;">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <p>${mensaje}</p>
    </div>
  `;
  
  eliminarAlertaAnterior();
  document.body.insertAdjacentHTML('beforeend', alertaHTML);
  
  setTimeout(() => {
    const alerta = document.getElementById('alertaFlotante');
    if (alerta) {
      alerta.style.opacity = '0';
      alerta.style.transform = 'translateY(-20px)';
      setTimeout(() => alerta.remove(), 300);
    }
  }, 4000);
}

function eliminarAlertaAnterior() {
  const alertaAnterior = document.getElementById('alertaFlotante');
  if (alertaAnterior) {
    alertaAnterior.remove();
  }
}

// ESTILOS PARA ALERTAS
// ========================================

if (!document.getElementById('estilosAlertas')) {
  const estilos = `
    <style id="estilosAlertas">
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
      
      .alerta-exito {
        background-color: #28a745;
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
      
      @media (max-width: 768px) {
        .alerta-flotante {
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', estilos);
}