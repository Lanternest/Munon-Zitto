// ========================================
// MENÚ HAMBURGUESA - FUNCIONALIDAD
// ========================================

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // OBTENER ELEMENTOS DEL DOM
  // ========================================
  
  const btnHamburguesa = document.getElementById('btnHamburguesa');
  const btnCerrarMenu = document.getElementById('btnCerrarMenu');
  const menuDesplegable = document.getElementById('menuDesplegable');
  const menuOverlay = document.getElementById('menuOverlay');
  const body = document.body;
  
  // ========================================
  // FUNCIÓN PARA ABRIR EL MENÚ
  // ========================================
  
  function abrirMenu() {
    // Añade la clase 'active' para mostrar el menú
    menuDesplegable.classList.add('active');
    menuOverlay.classList.add('active');
    btnHamburguesa.classList.add('active');
    
    // Bloquea el scroll de la página
    body.classList.add('menu-abierto');
    
    // Añade atributo de accesibilidad
    btnHamburguesa.setAttribute('aria-expanded', 'true');
  }
  
  // ========================================
  // FUNCIÓN PARA CERRAR EL MENÚ
  // ========================================
  
  function cerrarMenu() {
    // Quita la clase 'active' para ocultar el menú
    menuDesplegable.classList.remove('active');
    menuOverlay.classList.remove('active');
    btnHamburguesa.classList.remove('active');
    
    // Permite el scroll de la página nuevamente
    body.classList.remove('menu-abierto');
    
    // Actualiza atributo de accesibilidad
    btnHamburguesa.setAttribute('aria-expanded', 'false');
  }
  
  // ========================================
  // FUNCIÓN PARA ALTERNAR EL MENÚ (ABRIR/CERRAR)
  // ========================================
  
  function toggleMenu() {
    // Si el menú tiene la clase 'active', está abierto
    if (menuDesplegable.classList.contains('active')) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  }
  
  // ========================================
  // EVENT LISTENERS (EVENTOS)
  // ========================================
  
  // Click en el botón hamburguesa
  btnHamburguesa.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el click se propague
    toggleMenu();
  });
  
  // Click en el botón de cerrar (X)
  btnCerrarMenu.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el click se propague
    cerrarMenu();
  });
  
  // Click en el overlay oscuro (fondo)
  menuOverlay.addEventListener('click', function() {
    cerrarMenu();
  });
  
  // Click en cualquier enlace del menú (cierra automáticamente)
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(function(item) {
    item.addEventListener('click', function() {
      // Cierra el menú después de un pequeño delay para mejor UX
      setTimeout(cerrarMenu, 200);
    });
  });
  
  // ========================================
  // CERRAR CON LA TECLA ESC (ESCAPE)
  // ========================================
  
  document.addEventListener('keydown', function(e) {
    // Si se presiona la tecla Escape (código 27 o key 'Escape')
    if (e.key === 'Escape' || e.keyCode === 27) {
      // Si el menú está abierto, lo cierra
      if (menuDesplegable.classList.contains('active')) {
        cerrarMenu();
      }
    }
  });
  
  // ========================================
  // PREVENIR QUE CLICKS DENTRO DEL MENÚ LO CIERREN
  // ========================================
  
  menuDesplegable.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el click cierre el menú
  });
  
  // ========================================
  // AJUSTAR EL MENÚ AL CAMBIAR EL TAMAÑO DE LA VENTANA
  // ========================================
  
  let resizeTimer;
  window.addEventListener('resize', function() {
    // Limpia el timer anterior
    clearTimeout(resizeTimer);
    
    // Espera 250ms después de que el usuario deje de redimensionar
    resizeTimer = setTimeout(function() {
      // Si la ventana es muy ancha y el menú está abierto, lo cierra
      if (window.innerWidth > 1200 && menuDesplegable.classList.contains('active')) {
        cerrarMenu();
      }
    }, 250);
  });
  
  // ========================================
  // ANIMACIÓN SUAVE AL CARGAR LA PÁGINA
  // ========================================
  
  // Asegura que el menú esté cerrado al cargar
  cerrarMenu();
  
  console.log('Menú hamburguesa inicializado correctamente');
});

// ========================================
// FUNCIONES GLOBALES (OPCIONALES)
// ========================================

// Función para abrir el menú desde cualquier parte del código
function abrirMenuHamburguesa() {
  const menuDesplegable = document.getElementById('menuDesplegable');
  const menuOverlay = document.getElementById('menuOverlay');
  const btnHamburguesa = document.getElementById('btnHamburguesa');
  
  menuDesplegable.classList.add('active');
  menuOverlay.classList.add('active');
  btnHamburguesa.classList.add('active');
  document.body.classList.add('menu-abierto');
}

// Función para cerrar el menú desde cualquier parte del código
function cerrarMenuHamburguesa() {
  const menuDesplegable = document.getElementById('menuDesplegable');
  const menuOverlay = document.getElementById('menuOverlay');
  const btnHamburguesa = document.getElementById('btnHamburguesa');
  
  menuDesplegable.classList.remove('active');
  menuOverlay.classList.remove('active');
  btnHamburguesa.classList.remove('active');
  document.body.classList.remove('menu-abierto');
}