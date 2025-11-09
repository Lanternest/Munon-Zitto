// ========================================
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

// ========================================
// VALIDACIÓN DEL FORMULARIO
// ========================================

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  
  // Obtiene el formulario
  const form = document.getElementById('formRegistro');
  
  // Escucha el evento de envío del formulario
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Previene el envío por defecto
    
    // Obtiene los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // ========================================
    // VALIDACIONES
    // ========================================
    
    // Valida que todos los campos estén llenos
    if (!nombre || !apellido || !telefono || !email || !password || !confirmPassword) {
      alert('Por favor, complete todos los campos');
      return;
    }
    
    // Valida que el nombre tenga al menos 2 caracteres
    if (nombre.length < 2) {
      alert('El nombre debe tener al menos 2 caracteres');
      return;
    }
    
    // Valida que el apellido tenga al menos 2 caracteres
    if (apellido.length < 2) {
      alert('El apellido debe tener al menos 2 caracteres');
      return;
    }
    
    // Valida formato de teléfono (solo números y entre 8-15 dígitos)
    const telefonoRegex = /^[0-9]{8,15}$/;
    if (!telefonoRegex.test(telefono.replace(/[\s-]/g, ''))) {
      alert('Por favor, ingrese un número de teléfono válido (8-15 dígitos)');
      return;
    }
    
    // Valida formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, ingrese un email válido');
      return;
    }
    
    // Valida que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Valida que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    // ========================================
    // SI TODAS LAS VALIDACIONES PASAN
    // ========================================
    
    // Crea un objeto con los datos del usuario
    const usuario = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      email: email,
      password: password
    };
    
    // Muestra mensaje de éxito
    alert('¡Registro exitoso! Bienvenido ' + nombre + ' ' + apellido);
    
    // Aquí podrías enviar los datos a un servidor
    console.log('Datos del usuario:', usuario);
    
    // Limpia el formulario
    form.reset();
    
    // Opcionalmente, redirige a otra página
    // window.location.href = '/index.html';
  });
  
  // ========================================
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
  
  // ========================================
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

// ========================================
// FUNCIÓN PARA LIMPIAR EL FORMULARIO
// ========================================

function limpiarFormulario() {
  document.getElementById('formRegistro').reset();
}