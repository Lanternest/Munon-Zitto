// LOGIN - FUNCIONALIDAD
// ========================================

function togglePassword(inputId) {
  const passwordInput = document.getElementById(inputId);
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Si ya está autenticado, redirigir según el rol
  if (estaAutenticado()) {
    redirigirSegunRol();
    return;
  }
  
  const form = document.getElementById('formLogin');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
      mostrarError('Por favor, complete todos los campos');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mostrarError('Por favor, ingrese un email válido');
      return;
    }
    
    try {
      const btnSubmit = form.querySelector('button[type="submit"]');
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'Iniciando...';
      
      const loginData = {
        email: email,
        contrasenia: password
      };
      
      const response = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData)
      });
      
      // Guardar sesión
      guardarSesion(response);
      
      mostrarExito(`¡Bienvenido! Redirigiendo...`);
      
      // Redirigir según el rol
      setTimeout(() => {
        redirigirSegunRol();
      }, 1500);
      
    } catch (error) {
      console.error('Error en login:', error);
      mostrarError(error.message || 'Credenciales incorrectas. Por favor, intente nuevamente.');
      
      const btnSubmit = form.querySelector('button[type="submit"]');
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Iniciar Sesión';
    }
  });
});

function redirigirSegunRol() {
  const rol = localStorage.getItem('rol');
  
  switch(rol) {
    case 'ADMINISTRADOR':
      window.location.href = '../html/panel-admin.html';
      break;
    case 'CLIENTE':
      window.location.href = '../html/panel-cliente.html';
      break;
    case 'REPARTIDOR':
      window.location.href = '../html/panel-repartidor.html';
      break;
    default:
      window.location.href = '../html/index.html';
  }
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