import { SearchData } from "../types/pokemon";
import "../styles/App.css";
import "../styles/components.css";

interface PokemonFormProps {
  handleSearch: (data: SearchData) => void;
}

export const PokemonForm = ({ handleSearch }: PokemonFormProps) => {
  
  const clientAction = (formData: FormData) => {
    const pokemonName = formData.get("Pokemon") as string;
    
    if (!pokemonName || !pokemonName.trim()) {
      alert("Por favor, ingresa el nombre del pokemon");
      return;
    }
    
    handleSearch({ Pokemon: pokemonName });
  };

  return (
      <div className="form_container">
        <h1 className="page_title">¡Bienvenido a la Pokédex!</h1>

        <form className="pokemon_form" action={clientAction}>
          <div>
            <span className="light light-green"></span>
            <span className="light light-yellow"></span>
          </div>

          <input
            type="text"
            name="Pokemon"
            placeholder="Nombre del pokemon"
            autoComplete="off"
          />

          <input type="submit" value="Buscar" className="btn-submit" />
        </form>
      </div>
  );
};
