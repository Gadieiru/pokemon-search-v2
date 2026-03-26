import "../styles/layout.css";
import "../styles/components.css";
import "../styles/App.css";

export const PokemonName = ({ pokemon }) => {
  const locationsArray = pokemon.locations
    ? pokemon.locations.split(", ")
    : ["Desconocida"];

  return (
    <section className="grid-1-3">
      <div className="pokemon-img">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokemon_id}.png`}
          alt={pokemon.pokemon_name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg";
          }}
        />
      </div>

      <div className="principal-box">
        <div className="id-badge">#{pokemon.pokemon_id}</div>
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
              <div className="mini-bar">
                <div
                  className="fill"
                  style={{ width: `${pokemon.capture_rate}%` }}
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
            <li key={index}> ▶ {loc}</li>
          ))}
        </ul>
        <div className="scanner-line"></div> {/* Efecto decorativo */}
        <p className="p--color">¡Sugerencia: Usa una Ultra Ball!</p>
      </div>
    </section>
  );
};
