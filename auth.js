import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
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
const auth = getAuth(app);
const db = getFirestore(app);
// REGISTRO
const formRegistro = document.getElementById("form-registro");
if (formRegistro) {
  formRegistro.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre =
      document.getElementById("nombre").value;
    const correo =
      document.getElementById("correo").value;
    const password =
      document.getElementById("password").value;
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          correo,
          password
        );
      const user = userCredential.user;
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        correo,
        favoritos: [],
        horarios: []
      });
      alert("🔥 Cuenta creada");
      window.location.href = "Login.html";
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
}
// LOGIN
const formLogin = document.getElementById("form-login");
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const correo =
      document.getElementById("correo").value;
    const password =
      document.getElementById("password").value;
    try {
      await signInWithEmailAndPassword(
        auth,
        correo,
        password
      );
      alert("🔥 Bienvenido");
      window.location.href = "index.html";
    } catch (error) {
      console.error(error);
      alert("Correo o contraseña incorrectos");
    }
  });
}
