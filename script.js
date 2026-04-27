import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
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
const firebaseConfig = {
  apiKey: "AIzaSyBYdWrpnpAs32OG6IpDd4h_t9HBVzHFjVY",
  authDomain: "profesc.firebaseapp.com",
  projectId: "profesc",
  storageBucket: "profesc.firebasestorage.app",
  messagingSenderId: "107690490261",
  appId: "1:107690490261:web:757abbea47cd533d0a5e9c",
  measurementId: "G-9V097M6VTS"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
window.pruebaFirebase = async () => {
  alert("Click detectado 👀");

  try {
    await addDoc(collection(db, "test"), {
      mensaje: "hola desde tu app 😏",
      fecha: new Date()
    });

    alert("🔥 Se guardó en Firebase");
  } catch (error) {
    console.error(error);
    alert("Error 😢");
  }
};

