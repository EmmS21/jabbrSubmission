<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import PokemonCard from "./_components/PokemonCard.svelte";
  import Pagination from "./_components/Pagination.svelte";
  import NavButton from "./_components/NavButton.svelte";
  import SwitchComponent from "./_components/SwitchComponent.svelte";
  import { 
    fetchPokemon, 
    updateUrlParameter, 
  } from "$lib/index";
  import type {
    PokemonApiResponse,
    UpdateAndFetch,
    StarredEvent
  } from "../lib/interfaces/PokemonTypes";
  import { BASE_URL } from "$lib/constants"; 

  let pokemonData: PokemonApiResponse | null = null;
  let limit = 20;
  const dispatch = createEventDispatcher();
  let totalPages: number = 0;
  let currentPage = 1;
  let offset: number = 0;
  let isStarredView = false; 
  
  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const offset = parseInt(params.get("offset") || "0", 10);
    limit = parseInt(params.get("limit") || "20", 10);
    pokemonData = await updateUrlParameter(offset, limit, "initial");
    currentPage = Math.floor(offset / limit) + 1;
  });

  $: if (pokemonData && pokemonData.count && limit > 0) {
    totalPages = Math.ceil(pokemonData.count / limit);
  }

  $: currentPage = Math.floor(offset / limit) + 1;

  $: {
    const updateOnStarChange = () => {
      if (isStarredView) {
        handleStarredPokemons(isStarredView);
      }
    };
    updateOnStarChange(); 
  }


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
  ) => {
    offset = newOffset;
    console.log('resfd')
    const newUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${newOffset}&limit=${limit}`;
    await updateUrlParameter(newOffset, limit);
    pokemonData = await fetchPokemon(newUrl);
    currentPage = Math.ceil((newOffset + 1) / limit);
  };

  const handleStarredPokemons = async (arg: StarredEvent | boolean) => {
        let starred: boolean;
        if(typeof arg === "boolean"){
          starred = arg
        } else {
          starred = arg.detail.direction
        }
        isStarredView = starred; 
        if (starred){
          const starredPokemons = [];
          for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              const value = localStorage.getItem(key);
              console.log('key', key)
              console.log('value', value)
              if (value === "true") { 
                  starredPokemons.push({ name: key, url: "" });
              }
            }
          pokemonData = {
            count: starredPokemons.length,
            next: null,
            previous: null,
            results: starredPokemons
          };
        } else {
          pokemonData = await fetchPokemon(BASE_URL)
        }
  }
</script>

<div class="flex flex-col items-center w-full mt-4">
  <img src="/pokemon.png" alt="Pokemon" class="w-1/3 mb-4" />
    <SwitchComponent on:toggle={handleStarredPokemons}/>
</div>

<div class="flex justify-center items-center">
  <div class="flex flex-col w-11/12">
    <div class="pokemon-container grid grid-cols-5 gap-4 mt-12">
      {#if pokemonData}
        {#each pokemonData.results as pokemon}
          <PokemonCard
            name={pokemon.name}
            on:starChange={() => handleStarredPokemons(isStarredView)}
          />
        {/each}
      {/if}
    </div>
    {#if !isStarredView}
      <NavButton
        on:next={handleNext}
        on:previous={handlePrevious}
        previousDisabled={!pokemonData || !pokemonData.previous}
        nextDisabled={!pokemonData || !pokemonData.next}
      />
      <Pagination {totalPages} {currentPage} onPageClick={handlePageClick} />
    {/if}
  </div>
</div>
