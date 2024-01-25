import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onLogin(e) {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        var user = userCredential.user;
        if (user) {
          navigate("/app");
          toast.success("Login exitoso");
        }
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        toast.error("Verifica los datos ingresados");
      });
  }

  return (
    <div className="login-bg w-screen h-screen flex justify-center items-center">
      <div className="bg-white p-10 max-w-[400px] rounded-xl">
        <h1 className="font-bold uppercase text-4xl text-center">Login</h1>

        <form className="mt-10" onSubmit={onLogin}>
          <label className="font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-1 rounded-full pl-3 mb-5 mt-2 border-black"
            placeholder="correo@correo.com"
          />

          <label className="font-medium">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-1 rounded-full pl-3 mt-2 border-black"
            placeholder="**********"
            type="password"
          />

          <button
            type="submit"
            className="bg-red-500 mt-7 w-full text-white p-1 rounded-full font-semibold"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
