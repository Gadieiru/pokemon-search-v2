import React, { useState } from "react";
import { Message } from "./Message";
import { Loader } from "./Loader";
import { PokemonDetails } from "./PokemonDetails";
import { sounds } from "../helpers/soundHelper";
import "../styles/layout.css";

export const PokemonLayout = ({
  children,
  pokemonData,
  loading,
  history,
  error,
  search,
  onHistoryClick,
  onClearHistory,
}) => {
  const handleItemClick = (name) => {
    onHistoryClick({ Pokemon: name.toLowerCase() });
  };

  return (
    <div className="pokedex-page-wrapper">
      <header className="search-area-top">{children}</header>
      <div className="panels-container">
        <aside className="panel sidebar-left">
          <div className="panel-header">HISTORIAL</div>
          <ul className="history-list">
            {history.length > 0 ? (
              history.map((name, index) => (
                <li
                  key={index}
                  className="history-item"
                  onClick={() => {
                    sounds.playSelect();
                    handleItemClick(name);
                  }}
                >
                  <a className="pokedex-bullet">{name}</a>
                </li>
              ))
            ) : (
              <li className="display-placeholder">SIN REGISTROS</li>
            )}
          </ul>

          {history && (
            <button className="btn-clear" onClick={onClearHistory}>
              Eliminar historial
            </button>
          )}
        </aside>

        <main className="panel main-display">
          <div className="content-scroll">
            {loading ? (
              <Loader />
            ) : error ? (
              <Message msg={error} bgColor="#f00" />
            ) : pokemonData ? (
              <PokemonDetails search={search} pokemon={pokemonData} />
            ) : (
              <div className="display-placeholder">
                <span className="blink-text"></span> ESPERANDO SEÑAL DEL
                ESCÁNER...
              </div>
            )}
          </div>
        </main>

        <aside className="panel sidebar-right">
          <div className="panel-header">AYUDA</div>
          <p className="tip-text">
            Usa los nombres exactos, o al menos similares de cada pokemon para
            poder encontrarlo en la pokedex.
          </p>
          <div className="led-indicators">
            <div className="led blue"></div>
            <div className="led yellow"></div>
          </div>
        </aside>
      </div>
    </div>
  );
};
