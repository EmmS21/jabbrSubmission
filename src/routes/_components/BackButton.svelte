<!-- BackButton.svelte -->
<script lang="ts">
    export let navigateBack: () => void;
</script>

<div class="p-9 bg-gray-200 rounded-full shadow-md text-center transition-transform duration-300 ease-in-out"
    style="width: calc(1.5 * 5vh);"
>
    <button on:click={navigateBack} class="focus:outline-none focus:ring focus:ring-gray-300 inline-block">
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
    </button>
</div>
