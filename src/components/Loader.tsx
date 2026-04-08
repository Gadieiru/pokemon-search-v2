import React from "react";
import "../styles/animations.css"

export const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <div className="ball" aria-label="Cargando..."></div>
    </div>
  );
};
