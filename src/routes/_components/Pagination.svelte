<script lang="ts">
  export let totalPages: number;
  export let currentPage: number;
  export let onPageClick: (clickedPage: number) => void;

  const pagesToShow = 4;
  let startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  let endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  $: {
    if (currentPage > Math.floor(pagesToShow / 2)) {
      startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
      endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    } else {
      startPage = 1;
      endPage = Math.min(pagesToShow, totalPages);
    }

    // Adjust endPage when nearing the end of totalPages to ensure the range includes totalPages
    if (totalPages - currentPage < Math.floor(pagesToShow / 2)) {
      endPage = totalPages;
      startPage = Math.max(totalPages - pagesToShow + 1, 1);
    }
  }
</script>

<div class="flex justify-center mt-4">
  {#each Array.from( { length: endPage - startPage + 1 }, ) as _, i (startPage + i)}
    {#if startPage + i === currentPage}
      <button
        class="mx-1 py-1 px-2 rounded-full bg-transparent border border-black transition duration-300 text-black font-bold bg-sky-200"
        style="z-index: 1;"
        on:click={() => onPageClick(startPage + i)}
      >
        {startPage + i}
      </button>
    {:else}
      <button
        class="mx-1 py-1 px-2 rounded-full bg-transparent border border-black transition duration-300 text-black"
        style="z-index: 1;"
        on:click={() => onPageClick(startPage + i)}
      >
        {startPage + i}
      </button>
    {/if}
  {/each}
</div>
