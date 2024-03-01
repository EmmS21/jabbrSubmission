<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let previousDisabled: boolean;
  export let nextDisabled: boolean = false;

  const dispatch = createEventDispatcher();

  const handleNextClick = () => {
    dispatch("next");
  };

  const handlePreviousClick = () => {
    dispatch("previous");
  };
</script>

<div class="flex justify-center">
  <button
    class="{`bg-${previousDisabled ? 'gray' : 'sky'}-200 text-black py-2 px-4 border border-transparent transition duration-300 mt-12 mx-2 w-full`} {previousDisabled
      ? 'cursor-not-allowed'
      : ''} {previousDisabled ? '' : 'hover:border-blue-500'}"
    disabled={previousDisabled}
    on:click={handlePreviousClick}
  >
    Previous
  </button>
  <button
    class="{`bg-${nextDisabled ? 'gray' : 'sky'}-200 text-black py-2 px-4 border border-transparent transition duration-300 mt-12 mx-2 w-full`} {nextDisabled
      ? 'cursor-not-allowed'
      : ''} {nextDisabled ? '' : 'hover:border-blue-500'}"
    disabled={nextDisabled}
    on:click={handleNextClick}
  >
    Next
  </button>
</div>
