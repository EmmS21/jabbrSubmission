export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

export interface PokemonService {
  fetchPokemon(url?: string): Promise<PokemonApiResponse>;
  updateUrlParameter(
    currentOffset: number,
    limit?: number,
    direction?: "next" | "previous" | "initial",
  ): Promise<PokemonApiResponse>;
}

export interface PokemonDetails {
  name: string;
  types: string[];
  moves: string[];
  stats: { base_stat: number }[];
  sprites: { other: { home: { front_default: string } } };
}

export interface UpdateAndFetch {
  (
    newOffset: number,
    limit?: number,
    direction?: "next" | "previous" | "initial",
  ): Promise<void>;
}
