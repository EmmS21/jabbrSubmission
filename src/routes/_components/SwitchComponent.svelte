<script>
    import StarIcon from "./StarIcon.svelte";
    import FilledStarIcon from "./FilledStarIcon.svelte";
    import { onMount, createEventDispatcher } from "svelte";
    
    let isChecked = false;
    const dispatch = createEventDispatcher();
    $: currentIcon = isChecked ? FilledStarIcon : StarIcon;
    $: dispatch('toggle', { direction: isChecked });
    
    onMount(() => {
        const checkbox = document.getElementById('toggle_checkbox');
        checkbox.addEventListener('change', () => {
            isChecked = checkbox.checked;
        });
    });
    
</script>
  <style>

    #toggle_checkbox
    {
        display: none;
    }

    label
    {
        display: block;
        width: 110px;
        max-width: calc(100% - 300px);
        height: 50px;
        transform: translateY(-50%);
        cursor: pointer;
        transition: 0.3s ease background-color;
        overflow: hidden;
        bottom: 30px;
    }

    #star
    {
        position: absolute;
        top: 13px;
        left: 13px;
        width: 30px;
        height: 30px;
        transition: 0.3s ease top, 0.3s ease left, 0.3s ease transform, 0.3s ease background-color;
        z-index: 1;
    }
  
    #toggle_checkbox:checked + label
    {
        background-color: grey;
    }
  
    #toggle_checkbox:checked + label #star
    {
        left: 64px;
    }
      
  </style>
  
  <input type="checkbox" id="toggle_checkbox" >
  <label for="toggle_checkbox" class="bg-sky-200 mx-auto rounded-full scale-100" style="transform: translateY(4px);">
    <div class="absolute top-0 w-full text-center text-xs font-bold">{isChecked ? 'Favs' : 'All'}</div>
    <div id="star">
        {#if currentIcon === StarIcon}
        <div class="flex flex-col items-center">
            <StarIcon onClick={() => {}}/>
        </div>
    {:else}
            <FilledStarIcon onClick={() => {}}/>
        {/if}
    </div>
</label>