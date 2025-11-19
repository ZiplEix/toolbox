<script lang="ts">
  let {
    value = $bindable(0),
    max = 5,
    readonly = false,
    class: className = '',
    ...rest
  }: {
    value?: number;
    max?: number;
    readonly?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();

  let hoverValue = $state(0);

  function handleMouseEnter(index: number) {
    if (!readonly) {
      hoverValue = index;
    }
  }

  function handleMouseLeave() {
    if (!readonly) {
      hoverValue = 0;
    }
  }

  function handleClick(index: number) {
    if (!readonly) {
      value = index;
    }
  }
</script>

<div class="flex items-center gap-1 {className}" onmouseleave={handleMouseLeave} {...rest}>
  {#each Array(max) as _, i}
    {@const index = i + 1}
    {@const filled = hoverValue ? index <= hoverValue : index <= value}
    
    <button
      type="button"
      class="focus:outline-none transition-transform hover:scale-110 {readonly ? 'cursor-default' : 'cursor-pointer'}"
      onclick={() => handleClick(index)}
      onmouseenter={() => handleMouseEnter(index)}
      disabled={readonly}
      aria-label="Rate {index} out of {max}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class={filled ? 'text-yellow-400' : 'text-gray-300'}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  {/each}
</div>
