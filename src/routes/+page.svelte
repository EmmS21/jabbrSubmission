<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import PokemonCard from "./_components/PokemonCard.svelte";
  import Pagination from "./_components/Pagination.svelte";
  import NavButton from "./_components/NavButton.svelte";
  import { fetchPokemon, updateUrlParameter, toCamelCase } from "$lib/index";
  import type {
    PokemonApiResponse,
    UpdateAndFetch,
  } from "../lib/interfaces/PokemonTypes";

  let pokemonData: PokemonApiResponse | null = null;
  let limit = 20;
  const dispatch = createEventDispatcher();
  let totalPages: number = 0;
  let currentPage = 1;
  let offset: number = 0;

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const offset = parseInt(params.get("offset") || "0", 10);
    limit = parseInt(params.get("limit") || "20", 10);
    const initialUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    pokemonData = await updateUrlParameter(offset, limit, "initial");
    currentPage = Math.floor(offset / limit) + 1;
  });

  $: if (pokemonData && pokemonData.count && limit > 0) {
    totalPages = Math.ceil(pokemonData.count / limit);
  }

  $: currentPage = Math.floor(offset / limit) + 1;

  const calculateOffsetForDirection = (
    direction: "next" | "previous",
  ): number => {
    const currentOffset = parseInt(
      new URLSearchParams(window.location.search).get("offset") || "0",
      10,
    );
    return direction === "next"
      ? currentOffset + limit
      : Math.max(currentOffset - limit, 0);
  };

  const handleNext = async () => {
    await updateAndFetch(offset + limit, limit, "next");
  };

  const handlePrevious = async () => {
    await updateAndFetch(Math.max(offset - limit, 0), limit, "previous");
  };

  const handlePageClick = (clickedPage: number) => {
    currentPage = clickedPage;
    const newOffset = (clickedPage - 1) * limit;
    updateAndFetch(newOffset, limit);
  };

  const updateAndFetch: UpdateAndFetch = async (
    newOffset,
    limit = 20,
    direction,
  ) => {
    offset = newOffset;
    const newUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${newOffset}&limit=${limit}`;
    await updateUrlParameter(newOffset, limit);
    pokemonData = await fetchPokemon(newUrl);
    currentPage = Math.ceil((newOffset + 1) / limit);
  };
</script>

<img src="/pokemon.png" alt="Pokemon" class="mx-auto w-1/3 mt-8" />

<div class="flex justify-center items-center">
  <div class="flex flex-col w-11/12">
    <div class="pokemon-container grid grid-cols-5 gap-4 mt-12">
      {#if pokemonData}
        {#each pokemonData.results as pokemon}
          <PokemonCard
            name={pokemon.name}
            number={pokemon.url.split("/").filter(Boolean).pop()}
          />
        {/each}
      {/if}
    </div>
    <NavButton
      on:next={handleNext}
      on:previous={handlePrevious}
      previousDisabled={!pokemonData || !pokemonData.previous}
      nextDisabled={!pokemonData || !pokemonData.next}
    />
    <Pagination {totalPages} {currentPage} onPageClick={handlePageClick} />
  </div>
</div>
