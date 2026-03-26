import { ReactNode } from "react";
import { Message } from "./Message";
import { Loader } from "./Loader";
import { PokemonDetails } from "./PokemonDetails";
import { sounds } from "../helpers/soundHelper";
import { Pokemon, SearchData } from "../types/pokemon";
import "../styles/layout.css";

interface PokemonLayoutProps {
  children: ReactNode;
  pokemonData: Pokemon | null;
  loading: boolean;
  history: string[];
  error: string | null;
  search: SearchData | null;
  onHistoryClick: (data: SearchData) => void;
  onClearHistory: () => void;
}

export const PokemonLayout = ({
  children,
  pokemonData,
  loading,
  history,
  error,
  search,
  onHistoryClick,
  onClearHistory,
}: PokemonLayoutProps) => {
  const handleItemClick = (name: string): void => {
    onHistoryClick({ Pokemon: name.toLowerCase() });
  };

  return (
    <div className="pokedex-page-wrapper">
      <header className="search-area-top">{children}</header>

      <div className="panels-container">
        <aside
          className="panel sidebar-left"
          aria-label="Historial de búsqueda"
        >
          <div className="panel-header">Historial</div>
          <ul className="history-list">
            {history.length > 0 ? (
              history.map((name, index) => (
                <li
                  key={`${name}-${index}`}
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
              <li className="display-placeholder">Sin registros</li>
            )}
          </ul>

          {history.length > 0 && (
            <button 
            className="btn-clear" 
            onClick={onClearHistory}
            type="button">
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
                <span className="blink-text">▶</span> ESPERANDO SEÑAL DEL
                ESCÁNER...
              </div>
            )}
          </div>
        </main>

        <aside className="panel sidebar-right">
          <div className="panel-header">AYUDA</div>
          <p className="tip-text">
            <strong>TIP:</strong>Usa nombres exactos para sincronizar con la base de datos regional.
          </p>
          <div className="led-indicators">
            <div className={`led ${loading ? 'blue-blink' : pokemonData ? 'green' : 'red'}`}></div>
            <div className={`led ${error ? 'yellow-blink' : 'yellow'}`}></div>
          </div>
        </aside>
      </div>
    </div>
  );
};
