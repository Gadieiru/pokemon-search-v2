import { Message } from "./Message.js";
import { PokemonName } from "./PokemonDataSheet.js";

export const PokemonDetails = ({ search, pokemon }) => {
  return (
    <>
      {pokemon && pokemon?.pokemon_name ? (
        <>
          <PokemonName pokemon={pokemon} />
        </>
      ) : (
        <Message
          msg={`Error: "${search.pokemon}" No es un pokemon o quizas esta mal escrito.`}
          bgColor="#f00"
        />
      )}
    </>
  );
};
