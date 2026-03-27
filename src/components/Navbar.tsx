import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { useState } from "react";
import HomeIcon from "../icons/home.png";
import AddIcon from "../icons/plus.png";
import Pokeball from "../icons/pokeball.png";
import LogIn from "../icons/login.png";
import LogOut from "../icons/logout.png";
import Pokedex from "../icons/pokedex.png";
import "../styles/App.css";
import "../styles/navbar_menu.css";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();

    const confirmLogout = window.confirm(
      "¿Estás seguro de que deseas cerrar sesión?"
    );
    if (confirmLogout) {
      logout();
      navigate("/Login");
    }
  };

  return (
    <>
      <aside className={`navbar ${isOpen ? "open" : ""}`}>
        <nav className="navbar_nav">
          <div className="burger-container">
            <button className="burger-btn" onClick={toggleMenu}>
              <img className="img_pokeball" src={Pokeball} alt="boton" />
            </button>
          </div>

          <ul className={`menu-links`}>
            <li className="navbar_nav-list">
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active-link" : null)}
                to="/"
              >
                <img className="icon" src={HomeIcon} alt="Inicio" />
                <span className="press-start-2p-regular">Inicio</span>
              </NavLink>
            </li>

            <li className="navbar_nav-list">
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active-link" : null)}
                to="/Pokedex"
              >
                <img className="icon" src={Pokedex} alt="Inicio" />
                <span className="press-start-2p-regular">Pokedex</span>
              </NavLink>
            </li>

            <li className="navbar_nav-list">
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active-link" : null)}
                to="/Add"
              >
                <img className="icon" src={AddIcon} alt="Insertar" />
                <span className="press-start-2p-regular">Agregar</span>
              </NavLink>
            </li>

            <li className="navbar_nav-list">
              {auth ? (
                <NavLink
                  className="navbar_nav-link"
                  to="/Logout"
                  onClick={handleLogoutClick}
                >
                  <img className="icon" src={LogOut} alt="Cerrar Sesión" />
                  <span className="press-start-2p-regular">Logout</span>
                </NavLink>
              ) : (
                <NavLink
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "active-link" : null
                  }
                  to="/Login"
                >
                  <img className="icon" src={LogIn} alt="Iniciar Sesión" />
                  <span className="press-start-2p-regular">Login</span>
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};
