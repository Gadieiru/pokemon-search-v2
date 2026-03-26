import { Message } from "./Message";
import { PokemonName } from "./PokemonDataSheet";
import { Pokemon, SearchData } from "../types/pokemon";
interface PokemonDetailsProps {
  search: SearchData | null;
  pokemon: Pokemon | null;
}

export const PokemonDetails = ({ search, pokemon }: PokemonDetailsProps) => {

  const isValidPokemon = pokemon && pokemon.pokemon_name && pokemon.pokemon_id;

  return (
    <>
      {isValidPokemon ? (
        <PokemonName pokemon={pokemon} />
      ) : (
        <Message 
          msg={`Error: El término "${search?.Pokemon || 'desconocido'}" no devolvió resultados válidos`}
          bgColor="#dc3545"
        />
      )}
    </>
  );
};
