<script>
  import Tag from "./Tag.svelte";
  export let stats = [];
</script>

<div class="bg-gray-200 p-4 w-full">
  <div class="flex justify-around">
    <div>
      <Tag name={`Attack: ${stats.find(stat => stat.stat.name === "attack")?.base_stat}`} />
    </div>
    <div>
      <Tag name={`Defense: ${stats.find(stat => stat.stat.name === "defense")?.base_stat}`} />
    </div>
  </div>
</div>
