import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "TU_APIKEY",
  authDomain: "TU_AUTHDOMAIN",
  projectId: "TU_PROJECTID",
  storageBucket: "TU_STORAGE",
  messagingSenderId: "TU_MESSAGEID",
  appId: "TU_APPID"
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
