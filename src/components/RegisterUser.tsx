import React, { useState, useActionState } from "react";
import axios, {AxiosError} from "axios";
import { useNavigate, Link } from "react-router-dom";
import { sounds } from "../helpers/soundHelper";
import { notifySuccess } from "../helpers/alert";
import OpenEye from "../icons/ojo-abierto.png";
import CloseEye from "../icons/ojo-cerrado.png";
import Return from "../icons/return.png";
import "../styles/password_style.css";

interface ActionState {
  success?: boolean;
  error?: string | null;
}

export const RegisterUser: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userFirstname, setUserFirstname] = useState<string>("");
  const [userLastname, setUserLastname] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleRegisterAction = async (_prevState: ActionState | null): Promise<ActionState> => {
    const newUser = {
      firstname: userFirstname,
      lastname: userLastname,
      email: email,
      password: password,
    };

    try {
      await axios.post("http://localhost:3000/auth/register", newUser);

      sounds.playSuccess();
      notifySuccess("¡ÉXITO!", "Sesion iniciada con exito");
      navigate("/login")
      return { success: true, error: null}

    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message || "Error al conectar con el servidor";

      return { success: false, error: errorMessage};
    }
  };

  const [state, formAction, isPending] = useActionState(handleRegisterAction, null);

  return (
    <div className="form_content">
      <Link to="/login" className="btn-exit-login">
        <img src={Return} className="icon"/>
      </Link>

      <div className="form_user">
        <form onSubmit={(e) => { e.preventDefault(); formAction() }}>
          <h2 className="press-start-2p-regular page--title">Regístrate</h2>

          <input
            type="text"
            placeholder="Nombre de Usuario"
            className="heroui-style-input"
            value={userFirstname}
            onChange={(e) => setUserFirstname(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Apellido"
            className="heroui-style-input"
            value={userLastname}
            onChange={(e) => setUserLastname(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            className="heroui-style-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="heroui-style-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >

              <img
                src={showPassword ? CloseEye : OpenEye}
                alt="Toggle Password"
                className="eye-icon"
              />
            </button>
          </div>

          {state?.error && (
            <p className="error-message" style={{ color: '#ff4b4b', textAlign: 'center' }}>
              {state.error}
            </p>
          )}

          <button type="submit" className="btn" disabled={isPending}>
            {isPending ? "Registrando" : "Registrarse"}
          </button>

          <div>
            <h5>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login">Inicia sesión aquí.</Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};
