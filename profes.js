import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {getFirestore,collection,getDocs} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
const profesoresData = [
    {
      nombre: "Profesor A",
      rating: 4,
      opiniones: [
        {
          alumno: "Juan",
          texto: "Explica muy bien",
          empatia: 4,
          actitud: 5,
          dificultad: 3,
          evaluacion: 4
        }
      ]
    },
    {
      nombre: "Profesor B",
      rating: 3,
      opiniones: [
        {
          alumno: "Ana",
          texto: "Un poco estricto",
          empatia: 3,
          actitud: 3,
          dificultad: 4,
          evaluacion: 3
        }
      ]
    }
  ];
  function pintarEstrellas(num) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += `<i class="bi ${i <= num ? 'bi-star-fill' : 'bi-star'}"></i>`;
    }
    return html;
  }
  
  // Lista
  function renderLista(data = profesoresData) {
    const cont = document.getElementById("lista-general");
    cont.innerHTML = "";
  
    data.forEach((prof, index) => {
      cont.innerHTML += `
        <div class="prof-card" onclick="verProfesor(${index})">
          <div class="prof-info">
            <i class="bi bi-person-circle"></i>
            <h3>${prof.nombre}</h3>
          </div>
          <div class="estrellas">
            ${pintarEstrellas(prof.rating)}
          </div>
        </div>
      `;
    });
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

  function verProfesor(index) {
    const prof = profesoresData[index];
  
    document.getElementById("lista-general").classList.add("hidden");
  
    const perfil = document.getElementById("perfil-profesor");
    perfil.classList.remove("hidden");
  
    perfil.innerHTML = `
      <button onclick="volver()">⬅ Volver</button>
  
      <div class="prof-header">
        <div>
          <h2>${prof.nombre}</h2>
          <div class="estrellas">${pintarEstrellas(prof.rating)}</div>
        </div>
  
        <button class="btn-opiniones" onclick="irMisOpiniones()">
          Agregar Opinion
        </button>
      </div>
  
      ${prof.opiniones.map(op => `
        <div class="opinion-box">
          <strong>${op.alumno}</strong>
          <p>${op.texto}</p>
  
          <div>Empatía: ${pintarEstrellas(op.empatia)}</div>
          <div>Actitud: ${pintarEstrellas(op.actitud)}</div>
          <div>Dificultad: ${pintarEstrellas(op.dificultad)}</div>
          <div>Evaluación: ${pintarEstrellas(op.evaluacion)}</div>
        </div>
      `).join("")}
    `;
  }
  
  // Boton regresar
  function volver() {
    document.getElementById("perfil-profesor").classList.add("hidden");
    document.getElementById("lista-general").classList.remove("hidden");
  }
  
  // Buscar
  document.getElementById("buscador").addEventListener("input", e => {
    const texto = e.target.value.toLowerCase();
  
    const filtrados = profesoresData.filter(p =>
      p.nombre.toLowerCase().includes(texto)
    );
  
    renderLista(filtrados);
  });
  
  // Redireccionamiento
  renderLista();
  
  function irMisOpiniones() {
    window.location.href = "index.html";
  }
