import React from "react";

export interface Pokemon {
    pokemon_id: number;
    pokemon_name: string;
    types: string;
    rarity_name: string;
    capture_rate: number;
    initial_happiness: number;
    location: string | null;
}

export interface SearchData {
    Pokemon: string;
}

export interface PokemonLayoutProps {
    children: React.ReactNode;
    pokemonData: Pokemon | null;
    loading: boolean;
    history: string[];
    error: string | null;
    search: SearchData | null;
    onHistoryClick: (data: SearchData) => void;
    onCleanHistory: () => void
}