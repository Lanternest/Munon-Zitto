   let indiceSlide = 1;
mostrarSlide(indiceSlide);

function cambiarSlide(n) {
  mostrarSlide(indiceSlide += n);
}

function slideActual(n) {
  mostrarSlide(indiceSlide = n);
}

function mostrarSlide(n) {
  let slides = document.getElementsByClassName("slide");
  let indicadores = document.getElementsByClassName("indicador");
  
  if (n > slides.length) {indiceSlide = 1}
  if (n < 1) {indiceSlide = slides.length}
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  
  for (let i = 0; i < indicadores.length; i++) {
    indicadores[i].classList.remove("active");
  }
  
  slides[indiceSlide-1].classList.add("active");
  indicadores[indiceSlide-1].classList.add("active");
}

// Cambio automático cada 5 segundos
setInterval(function() {
  cambiarSlide(1);
}, 5000);