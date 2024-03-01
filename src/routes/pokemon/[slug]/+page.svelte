<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { BASE_URL } from "$lib/constants";
  import StatsCard from "../../_components/StatsCard.svelte";
  import Tag from "../../_components/Tag.svelte";
  import Footer from "../../_components/Footer.svelte";
  import {
    checkLocalStorage,
    getIsStarred,
    toggleStar,
    fetchPokemonDetails,
    toCamelCase,
  } from "$lib/index";
  import FilledStarIcon from "../../_components/FilledStarIcon.svelte";
  import StarIcon from "../../_components/StarIcon.svelte";

  let pokemonDetails = null;
  let typeNames: string[] = [];
  let moveNames: string[] = [];
  let isStarred: boolean = false;
  let name: string;

  onMount(async () => {
    const slug = $page.params.slug;
    const url = `${BASE_URL}${slug}`;

    try {
      pokemonDetails = await fetchPokemonDetails(url);
      if (pokemonDetails) {
        name = pokemonDetails.name;
        checkLocalStorage(name);
        isStarred = getIsStarred();
        typeNames = pokemonDetails.types;
        moveNames = pokemonDetails.moves;
      } else {
        throw new Error("Failed to fetch Pokémon details");
      }
    } catch (error) {
      console.error(error);
      pokemonDetails = null;
    }
  });

  afterUpdate(() => {
    checkLocalStorage(name);
    isStarred = getIsStarred();
  });

  const handleToggleStar = (event: MouseEvent, pokemonName: string) => {
    isStarred = toggleStar(name, isStarred);
    event.stopPropagation();
  };

  const navigateBack = () => {
    const pokemonNumber = parseInt($page.params.slug);
    if (pokemonNumber !== null) {
      const offset = Math.floor((pokemonNumber - 1) / 20) * 20;
      goto(`/?offset=${offset}&limit=20`);
    } else {
      goto("/");
    }
  };
</script>

{#if pokemonDetails}
  <div class="flex flex-col min-h-screen">
    <div style="position: absolute; top: 0; left: 0; padding: 1rem;">
      <button on:click={() => navigateBack()} class="back-button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="vertical-align: middle;"
        >
          <path
            d="M19 12H5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back
      </button>
    </div>
    <div class="flex-grow">
      <div class="flex flex-col items-center mt-12">
        <h1 class="text-center capitalize text-5xl font-bold">
          {toCamelCase(pokemonDetails.name)}
        </h1>
        <div
          class="flex justify-between items-center w-full max-w-4xl gap-10 mt-12"
        >
          <StatsCard header="HP Base">
            <Tag name={`HP: ${pokemonDetails.stats[0].base_stat}`} />
          </StatsCard>
          <StatsCard header="Types">
            <div class="flex flex-wrap gap-2 mt-2">
              {#each typeNames as typeName}
                <Tag name={typeName} />
              {/each}
            </div>
          </StatsCard>
        </div>
        <div
          class="relative bg-gray-200 p-4 rounded-lg inline-block w-auto"
          style="margin-top: 5vh;"
        >
          <img
            src={pokemonDetails.sprites.other.home.front_default}
            alt={pokemonDetails.name}
            class="w-64 h-auto"
          />

          <StarIcon onClick={(event) => handleToggleStar(event, name)} />
          {#if isStarred}
            <FilledStarIcon
              onClick={(event) => handleToggleStar(event, name)}
            />
          {/if}

          <StatsCard header="Moves" content="">
            <div class="flex flex-wrap gap-2 mt-2">
              {#each moveNames as moveName}
                <Tag name={moveName} />
              {/each}
            </div>
          </StatsCard>
        </div>
      </div>
    </div>
    <Footer stats={pokemonDetails.stats} />
  </div>
{:else}
  <p>Pokémon details not found.</p>
{/if}
