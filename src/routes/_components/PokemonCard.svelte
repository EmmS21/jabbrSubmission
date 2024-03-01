<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { goto } from "$app/navigation";
  import FilledStarIcon from "./FilledStarIcon.svelte";
  import StarIcon from "./StarIcon.svelte";
  import {
    checkLocalStorage,
    getIsStarred,
    toggleStar,
    toCamelCase,
  } from "$lib/index";

  export let name: string;
  export let number: string;

  let isStarred: boolean = false;

  onMount(() => {
    checkLocalStorage(name);
    isStarred = getIsStarred();
  });

  afterUpdate(() => {
    checkLocalStorage(name);
    isStarred = getIsStarred();
  });

  const handleToggleStar = (event: MouseEvent, pokemonName: string) => {
    isStarred = toggleStar(name, isStarred);
    event.stopPropagation();
  };

  const navigateToDetail = () => {
    goto(`/pokemon/${number}`);
  };
</script>

<div
  class="relative card p-2 sm:p-4 m-1 sm:m-2 bg-gray-200 shadow-lg rounded h-full min-h-0 whitespace-normal overflow-auto cursor-pointer"
  on:click={navigateToDetail}
>
  <StarIcon onClick={(event) => handleToggleStar(event, name)} />
  {#if isStarred}
    <FilledStarIcon onClick={(event) => handleToggleStar(event, name)} />
  {/if}
  <p style="word-wrap: break-word;">{toCamelCase(name)}</p>
</div>
