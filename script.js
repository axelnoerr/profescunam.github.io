const vistaDetalles = document.getElementById('vista-detalles');
const vistaFormulario = document.getElementById('vista-formulario');
const formulario = document.getElementById('formulario-profesor');

document.getElementById('btn-abrir-formulario').addEventListener('click', () => {
  vistaDetalles.style.display = 'none';
  vistaFormulario.style.display = 'block';
  formulario.reset();
  limpiarEstrellasFormulario();
});

document.getElementById('btn-cancelar').addEventListener('click', () => {
  vistaFormulario.style.display = 'none';
  vistaDetalles.style.display = 'block';
});

let calificacionesActuales = { empatia: 0, evaluacion: 0, actitud: 0, dificultad: 0 };

const interactivos = document.querySelectorAll('.rankeo.interactivo');
interactivos.forEach(contenedor => {
  const stars = contenedor.querySelectorAll('.star');
  const categoria = contenedor.getAttribute('data-categoria');

  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
  
      calificacionesActuales[categoria] = index + 1;
  
      stars.forEach((s, i) => {
        if (i <= index) s.classList.add('checked');
        else s.classList.remove('checked');
      });
    });
  });
});

function limpiarEstrellasFormulario() {
  calificacionesActuales = { empatia: 0, evaluacion: 0, actitud: 0, dificultad: 0 };
  document.querySelectorAll('.rankeo.interactivo .star').forEach(s => s.classList.remove('checked'));
}


