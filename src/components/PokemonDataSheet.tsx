import { Pokemon } from "../types/pokemon";
import "../styles/layout.css";
import "../styles/components.css";
import "../styles/App.css";

interface PokemonNameProps {
  pokemon: Pokemon;
}

export const PokemonName = ({ pokemon }: PokemonNameProps) => {
  const locationsArray = pokemon.location
    ? pokemon.location.split(", ")
    : ["Habitat desconocido"];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src =
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg";
  };

  return (
    <section className="grid-1-3">
      <div className="pokemon-img">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokemon_id}.png`}
          alt={pokemon.pokemon_name}
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      <div className="principal-box">
        <div className="id-badge">
          N.º {pokemon.pokemon_id.toString().padStart(3, "0")}
        </div>

        <div className="data-item">
          <h2 className="label-text">Nombre:</h2>
          <h3 className="value-text">{pokemon.pokemon_name.toUpperCase()}</h3>
        </div>

        <div className="data-item">
          <h2 className="label-text">Tipo:</h2>
          <h3 className="value-text type-badge">{pokemon.types}</h3>
        </div>

        <div className="data-item">
          <h2 className="label-text">Rareza:</h2>
          <h3 className="value-text">{pokemon.rarity_name}</h3>
        </div>
      </div>

      {/* PANEL DERECHO INFERIOR: ESTADÍSTICAS */}
      <div className="pokemon-info">
        <div className="secundary-box">
          <div className="data-item">
            <h2 className="label-text">Ratio de Captura:</h2>
            <div className="stat-row">
              <h3 className="value-text">{pokemon.capture_rate}%</h3>
              {/* Barra visual opcional */}
              <div
                className="mini-bar"
                role="progressbar"
                aria-valuenow={pokemon.capture_rate}
              >
                <div
                  className="fill"
                  style={{ width: `${Math.min(pokemon.capture_rate, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="data-item">
            <h2 className="label-text">Felicidad Base:</h2>
            <div className="stat-row">
              <h3 className="value-text">{pokemon.initial_happiness}%</h3>
              <div className="mini-bar">
                <div
                  className="fill happiness"
                  style={{
                    width: `${(pokemon.initial_happiness / 255) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL INFERIOR: LORE Y UBICACIÓN */}
      <div className="third-box">
        <h2 className="label-text">Registro de Avistamientos:</h2>
        <ul className="location-list">
          {locationsArray.map((loc, index) => (
            <li key={`${index}-${loc}`}> 
                <span className="bullet-icon">▶</span> {loc}
            </li>
          ))}
        </ul>

        <div className="scanner-line"></div>
        <div className="capture-tip">
          <p className="p--color">
            {pokemon.capture_rate < 50 
              ? "¡Sugerencia: Usa una Ultra Ball!" 
              : "¡Sugerencia: Una Poke Ball bastará!"}
          </p>
        </div>
      </div>
    </section>
  );
};
