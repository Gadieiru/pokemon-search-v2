import { useState, useEffect } from "react";
import { PokemonForm } from "./PokemonForm";
import { HelpHttp } from "../helpers/HelpHttp";
import { PokemonLayout } from "./PokemonLayout";
import { sounds } from "../helpers/soundHelper";
import { Pokemon, SearchData } from "../types/pokemon";
import "../styles/App.css";
import "../styles/components.css";
import "../styles/layout.css";

const URL_BASE = "http://localhost:3000/pokemon/search";
const HISTORY_KEY = "pokemon_history";
const MAX_HISTORY_LIMIT = 6;

export const PokemonSearch = () => {
  const [search, setSearch] = useState<SearchData | null>(null);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const api = HelpHttp();

  useEffect(() => {
    if (!search) return;

    const controller = new AbortController();

    const GetPokemonData = async () => {
      const { Pokemon: queryName } = search;
      setLoading(true);
      setError(null);
      setPokemon(null);
      // Se activa el loading

      try {
        const res = await api.get<Pokemon[]>(URL_BASE, {
          params: { search: queryName },
          signal: controller.signal,
        });

        if (res && "err" in res && res.err) {
          setError(`Error ${res.status}: ${res.statusText}`);
          return;
        }

        const data = res as Pokemon[];

        if (data && data.length > 0) {
          const foundPokemon = data[0];

          if (foundPokemon && "pokemon_name" in foundPokemon) {
            setPokemon(foundPokemon);
            sounds.playSelect();

            setHistory((prev) => {
              const nameUpper = foundPokemon.pokemon_name.toUpperCase();
              const filtered = prev.filter((item) => item !== nameUpper);
              return [nameUpper, ...filtered].slice(0, MAX_HISTORY_LIMIT);
            });
          }
        } else {
          setError(`No se encontró ningún resultado para: "${queryName}"`);
          setPokemon(null);
        }
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err.message || "Hubo un error al conectar con el servidor.");
      } finally {
        setLoading(false);
        // Fin de la peticion del useEffect
      }
    };
    // se llama al fetch Data de nuevo y este se volvera a ejecutar en el momento en que el :search: cambie.
    GetPokemonData();
    return () => controller.abort();
  }, [search]);

  useEffect(() => {
    localStorage.setItem("pokemon_history", JSON.stringify(history));
  }, [history]);

  const handleSearch = (data: SearchData) => {
    setSearch(data);
  };

  const handleClearHistory = () => {
    sounds.playDelete();
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

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
