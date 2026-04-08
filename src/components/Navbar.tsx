import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { confirmDelete } from "../helpers/alert";
import { useAuth } from "../hooks/useAuth";
import { sounds } from "../helpers/soundHelper";
import HomeIcon from "../icons/home.png";
import AddIcon from "../icons/plus.png";
import Pokeball from "../icons/pokeball.png";
import LogIn from "../icons/login.png";
import LogOut from "../icons/logout.png";
import Pokedex from "../icons/pokedex.png";
import "../styles/App.css";
import "../styles/navbar_menu.css";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = (): void => {
    sounds.playSelect();
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);

    const confirmed = await confirmDelete("SESION");

    if (confirmed) {
      sounds.playDelete();
      logout();
      navigate("/Login");
    }
  };

  return (
    <>
      <aside className={`navbar ${isOpen ? "open" : ""}`}>
        <nav className="navbar_nav">
          <div className="burger-container">
            <button
              className="burger-btn"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <img
                className="img_pokeball"
                src={Pokeball}
                alt="pokeball toggle"
              />
            </button>
          </div>

          <ul className={`menu-links`}>
            <li className="navbar_nav-list">
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/"
              >
                <img className="icon" src={HomeIcon} alt="Inicio" />
                <span className="press-start-2p-regular">Inicio</span>
              </NavLink>
            </li>

            <li className="navbar_nav-list">
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/Pokedex"
              >
                <img className="icon" src={Pokedex} alt="Pokedex" />
                <span className="press-start-2p-regular">Pokedex</span>
              </NavLink>
            </li>

            <li className="navbar_nav-list">
              <NavLink
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => (isActive ? "active-link" : "")}
                to="/Add"
              >
                <img className="icon" src={AddIcon} alt="Agregar" />
                <span className="press-start-2p-regular">Agregar</span>
              </NavLink>
            </li>

            <li className="navbar_nav-list">
              {auth ? (
                <NavLink
                  className="navbar_nav-link"
                  to="#"
                  onClick={handleLogoutClick}
                >
                  <img className="icon" src={LogOut} alt="Cerrar Sesión" />
                  <span className="press-start-2p-regular">Logout</span>
                </NavLink>
              ) : (
                <NavLink
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
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
