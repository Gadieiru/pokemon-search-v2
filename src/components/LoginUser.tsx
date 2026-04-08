import { useState, useActionState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";
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
 console.log("Hola mundo")
export const LoginUser = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  console.log("1. El componente inició renderizado");
  
  const handleLoginAction = async (
    _prevState: ActionState | null,
    formData: FormData
  ): Promise<ActionState> => {
    try {
      const email = formData.get("email") as string;
     const password = formData.get("password") as string;

      const response = await axios.post<LoginResponse>(
        "http://localhost:3000/auth/login",
        { email, password },
      );

      const { token, user } = response.data;

      console.log("LLego el token?", token);

      if (token) {
        localStorage.setItem("access_token", token)
        login(token, user);
      } else{
        console.error("El backend no envio el token en el JSON")
      }

      localStorage.setItem("access_token", token);

      sounds.playSuccess();
      notifySuccess("¡ÉXITO!", "Sesion iniciada con exito");


      setTimeout(() => {
        navigate("/add");
      }, 1000);

      return { success: true, error: null };
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.log("DATOS DEL ERROR:", error.response?.data);
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
          action={formAction}
        >
          <h2 className="press-start-2p-regular page--title">Inicia Sesion</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="heroui-style-input"
            disabled={isPending}
            required
          />

          <div className="password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              className="heroui-style-input"
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
