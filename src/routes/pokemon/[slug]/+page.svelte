<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { BASE_URL } from "$lib/constants";
  import Tag from "../../_components/Tag.svelte";
  import HeaderTag from "../../_components/HeaderTag.svelte";
  import Footer from "../../_components/Footer.svelte";
  import BackButton from "../../_components/BackButton.svelte";
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
      <BackButton navigateBack={navigateBack} />
    </div>
    <div class="absolute top-0 right-0 p-4">
      {#if isStarred}
        <FilledStarIcon onClick={(event) => handleToggleStar(event, name)} />
      {:else}
        <StarIcon onClick={(event) => handleToggleStar(event, name)} />
      {/if}
    </div>
    <div class="flex-grow">
      <div class="flex flex-col items-center mt-12">
        <h1 class="text-center capitalize text-5xl font-bold">
          {toCamelCase(pokemonDetails.name)}
        </h1>
        <div
          class="relative bg-gray-200 p-4 rounded-lg inline-block w-full max-w-4xl mt-2"
          style="margin-top: 5vh; height: calc(1.5 * 40vh)"
        >
          <div class="flex justify-between items-start">
            <div class="flex flex-wrap gap-2">
              <HeaderTag heading={"Type:"}/>
              {#each typeNames as typeName}
                <Tag name={typeName} />
              {/each}
            </div>
            <Tag name={`HP: ${pokemonDetails.stats[0].base_stat}`} class="ml-auto" />
          </div>
          <img
            src={pokemonDetails.sprites.other.home.front_default}
            alt={pokemonDetails.name}
            class="w-64 h-auto mx-auto"
          />
          <div class="text-center mt-2">
            <div class="mb-2">
              <HeaderTag heading={"Moves"}/>
            </div>
            <div class="flex flex-wrap gap-2 justify-center">
              {#each moveNames as moveName}
                <Tag name={moveName} />
              {/each}
            </div>
          </div>
          
        </div>
      </div>
    </div>
    <Footer stats={pokemonDetails.stats} />
  </div>
{:else}
  <p>Pokémon details not found.</p>
{/if}