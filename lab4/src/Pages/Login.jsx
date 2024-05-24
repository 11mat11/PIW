import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../data/userService";
import { auth } from '../firebaseConfig.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Zalogowano użytkownika pomyślnie
        const user = userCredential.user;
        console.log("Zalogowano użytkownika:", user);
        // Przekieruj użytkownika po zalogowaniu do innej strony
        navigate("/");
      })
      .catch((error) => {
        // Wystąpił błąd podczas logowania użytkownika
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Błąd logowania użytkownika:", errorCode, errorMessage);
      });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Zarejestrowano użytkownika pomyślnie
        const user = userCredential.user;
        console.log("Zarejestrowano użytkownika:", user);
        // Przekieruj użytkownika po rejestracji do innej strony
        navigate("/");
      })
      .catch((error) => {
        // Wystąpił błąd podczas rejestracji użytkownika
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Błąd rejestracji użytkownika:", errorCode, errorMessage);
      });
  };

  return (
    <header className="login-header">
      <main className="main-center">
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          className="login-input" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          className="login-input" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <br />
        <button className="App-mini-button" onClick={handleLoginWithEmail}>Login with email</button>
        <br />
        <button className="App-mini-button" onClick={handleRegister}>Register with email</button>
        <br />
        <button className="App-mini-button" onClick={() => login(navigate)}>Login with Google</button>
      </main>
    </header>
  );
};

export default Login;
