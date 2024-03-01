<script>
  export let header = "";
</script>

<div class="rounded overflow-hidden shadow-lg">
  <div class="bg-sky-200 px-6 py-2">
    <div class="font-bold text-xl mb-2 text-center">{header}</div>
  </div>
  <div class="bg-gray-200 px-6 py-2">
    <p class="text-gray-700 text-base">
      <slot />
    </p>
  </div>
</div>
