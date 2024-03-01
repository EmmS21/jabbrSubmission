import axios from "axios";
import type {
  PokemonApiResponse,
  PokemonService,
  PokemonDetails,
} from "./interfaces/PokemonTypes";
import { browser } from "$app/environment";

let isStarred: boolean = false;

export const fetchPokemon: PokemonService["fetchPokemon"] = async (
  url = "https://pokeapi.co/api/v2/pokemon/",
): Promise<PokemonApiResponse> => {
  try {
    const response = await axios.get<PokemonApiResponse>(url);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Pokémon");
  }
};

export async function fetchPokemonDetails(
  url: string,
): Promise<PokemonDetails | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon");
    }
    const pokemonDetails = await response.json();
    const name = pokemonDetails.name;
    const types = pokemonDetails.types.map(
      (type: { type: { name: string } }) => type.type.name,
    );
    const moves = pokemonDetails.moves
      .slice(0, 3)
      .map((move: { move: { name: string } }) => move.move.name);
    const stats = pokemonDetails.stats;
    const sprites = pokemonDetails.sprites;
    return { name, types, moves, stats, sprites };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const updateUrlParameter: PokemonService["updateUrlParameter"] = async (
  currentOffset = 0,
  limit = 20,
  direction?: "next" | "previous" | "initial",
): Promise<PokemonApiResponse> => {
  let newOffset = currentOffset;
  if (direction === "next") {
    newOffset += limit;
  } else if (direction === "previous") {
    newOffset = Math.max(currentOffset - limit, 0);
  }
  const newUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${newOffset}&limit=${limit}`;
  if (browser) {
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?offset=${newOffset}&limit=${limit}`,
    );
  }

  return await fetchPokemon(newUrl);
};

export const toggleStar = (name: string, isStarred: boolean) => {
  const localStorageKey = name;
  isStarred = !isStarred;
  if (isStarred) {
    localStorage.setItem(localStorageKey, "true");
  } else {
    localStorage.removeItem(localStorageKey);
  }
};

export const checkLocalStorage = (name: string) => {
  const localStorageKey = name;
  const localStorageIsStarred = localStorage.getItem(localStorageKey);
  isStarred =
    localStorageIsStarred !== null ? localStorageIsStarred === "true" : false;
};

export const getIsStarred = (): boolean => {
  return isStarred;
};

export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((word, index) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
