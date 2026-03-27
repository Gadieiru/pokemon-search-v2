import React from "react";

export const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer>
      <h5 className="press-start-2p-regular">
        © {currentYear} - Pokedex Pro | Hecho por un Maestro Pokémon
      </h5>
      <div className="footer-icons">
        <p>Esta es una página de prueba. gracias por visitar :3</p>
      </div>
    </footer>
  );
};
