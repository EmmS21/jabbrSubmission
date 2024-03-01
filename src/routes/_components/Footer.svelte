<script>
  import Tag from "./Tag.svelte";
  export let stats = [];
</script>

<div class="bg-gray-200 p-4 w-full">
  <div class="flex justify-around">
    <div class="bg-sky-200 p-2 rounded">
      <h2 class="font-bold text-black text-center">Attack</h2>
      {#each stats as stat}
        {#if stat.stat.name === "attack"}
          <Tag name={`Attack: ${stat.base_stat}`} />
        {/if}
      {/each}
    </div>
    <div class="bg-sky-200 p-2 rounded">
      <h2 class="font-bold text-black text-center">Defense</h2>
      {#each stats as stat}
        {#if stat.stat.name === "defense"}
          <Tag name={`Defense: ${stat.base_stat}`} />
        {/if}
      {/each}
    </div>
  </div>
</div>
