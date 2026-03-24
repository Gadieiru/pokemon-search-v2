import React, { useState, useEffect } from "react";
import { PokemonForm } from "./PokemonForm.jsx";
import { HelpHttp } from "../helpers/HelpHttp.jsx";
import { PokemonLayout } from "./PokemonLayout.jsx";
import "../styles/App.css";
import "../styles/components.css";
import "../styles/layout.css";
import { sounds } from "../helpers/soundHelper.js";

export const PokemonSearch = () => {
  const [search, setSearch] = useState(null);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("pokemon_history");
    return saved ? JSON.parse(saved) : [];
  });

  const api = HelpHttp();
  const urlBase = "http://localhost:3000/pokemon/search";

  useEffect(() => {
    if (!search) return;

    const axiosData = async () => {
      const { Pokemon } = search;
      setLoading(true);
      setError(null);
      setPokemon(null);
      // Se activa el loading

      try {
        const res = await api.get(urlBase, {
          params: {search: Pokemon}
        })

        if (!res.err && res.length > 0) {
          const newPokemon = res[0];
          setPokemon(newPokemon);

          // res[0] porque el backend devuelve un array con el mejor resultado.
          setHistory((prev) => {
            const name = newPokemon.pokemon_name.toUpperCase();
            if (prev.includes(name)) return prev;
            return [name, ...prev].slice(0, 6);
          });
        } else {
          setError(`No se encontró ningún resultado para: ${Pokemon}`);
        }
      } catch (error) {
        console.error("Error al obtener datos", error);
        setError("Hubo un error al conectar con el servidor.");
      } finally {
        setLoading(false);
        // Fin de la peticion del useEffect
      }
    };
    // se llama al fetch Data de nuevo y este se volvera a ejecutar en el momento en que el :search: cambie.
    axiosData();
  }, [search]);

  useEffect(() => {
    localStorage.setItem("pokemon_history", JSON.stringify(history));
  }, [history]);

  const handleSearch = (data) => {
    // console.log(data);
    setSearch(data);
  };

  const handleClearHistory = () => {
    sounds.playDelete();
    setHistory([]);
  }

  return (
    <div>
      <PokemonLayout
        history={history}
        pokemonData={pokemon}
        loading={loading}
        error={error}
        search={search}
        onHistoryClick={handleSearch}
        onClearHistory={handleClearHistory}
      >
        <PokemonForm handleSearch={handleSearch} />
      </PokemonLayout>
    </div>
  );
};

/*      {pokemon && !loading && (
              <PokemonDetails search={search} pokemon={pokemon} />
        )} */
