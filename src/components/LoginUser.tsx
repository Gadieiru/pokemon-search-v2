import { useState, useActionState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth.js";
import { notifyError, notifySuccess } from "../helpers/alert";
import { sounds } from "../helpers/soundHelper";
import OpenEye from "../icons/ojo-abierto.png";
import CloseEye from "../icons/ojo-cerrado.png";
import Return from "../icons/return.png";
import "../styles/password_style.css";
import "../styles/components.css";

interface LoginResponse {
  token: string;
  user: any; // Puedes cambiar 'any' por tu interfaz de Usuario si la tienes
}

interface ActionState {
  success?: boolean;
  error?: string | null;
}

export const LoginUser = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginAction = async (
    _prevState: ActionState | null,
  ): Promise<ActionState> => {
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/auth/login",
        { email, password },
      );

      const { token, user } = response.data;

      sounds.playSuccess();
      notifySuccess("¡ÉXITO!", "Sesion iniciada con exito");

      login(token, user);

      setTimeout(() => {
        navigate("/add");
      }, 1000);

      return { success: true, error: null };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMesagge =
        error.response?.data?.message || "Credenciales incorrectas";

      sounds.playError();
      notifyError("ACCESO DENEGADO", errorMesagge);

      return { success: false, error: errorMesagge };
    }
  };

  const [state, formAction, isPending] = useActionState(
    handleLoginAction,
    null,
  );

  return (
    <div className="form_content">
      <Link to="/" className="btn-exit-login">
        <img src={Return} className="icon" />
      </Link>

      <div className="form_user">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formAction();
          }}
        >
          <h2 className="press-start-2p-regular page--title">Inicia Sesion</h2>

          <input
            type="email"
            placeholder="Email"
            className="heroui-style-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
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

          <button type="submit" className="btn" disabled={isPending}>
            {isPending ? "Entrando" : "Iniciar Sesion"}
          </button>

          {state?.error && (
            <p
              className="error-message"
              style={{
                color: "#ff4b4b",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {state.error}
            </p>
          )}

          <div>
            <h5>
              ¿Aun no tienes una cuenta?{" "}
              <Link to="/register">Registrate aqui.</Link>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};
