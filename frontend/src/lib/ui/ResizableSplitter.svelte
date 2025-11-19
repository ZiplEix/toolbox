<script lang="ts">
  import { type Snippet } from 'svelte';
  import { onMount } from 'svelte';

  let {
    direction = 'horizontal',
    initialSplit = 50,
    minSize = 10,
    class: className = '',
    first,
    second,
    ...rest
  }: {
    direction?: 'horizontal' | 'vertical';
    initialSplit?: number;
    minSize?: number;
    class?: string;
    first: Snippet;
    second: Snippet;
    [key: string]: any;
  } = $props();

  let split = $state(initialSplit);
  let isDragging = $state(false);
  let containerElement: HTMLElement | undefined = $state();

  function handleMouseDown(e: MouseEvent) {
    e.preventDefault();
    isDragging = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isDragging || !containerElement) return;

    const rect = containerElement.getBoundingClientRect();
    let newSplit;

    if (direction === 'horizontal') {
      const x = e.clientX - rect.left;
      newSplit = (x / rect.width) * 100;
    } else {
      const y = e.clientY - rect.top;
      newSplit = (y / rect.height) * 100;
    }

    // Clamp values
    newSplit = Math.max(minSize, Math.min(100 - minSize, newSplit));
    split = newSplit;
  }

  function handleMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }
</script>

<div
  bind:this={containerElement}
  class="flex h-full w-full overflow-hidden {direction === 'vertical' ? 'flex-col' : ''} {className}"
  {...rest}
>
  <!-- First Pane -->
  <div style="flex-basis: {split}%" class="relative overflow-auto">
    {@render first()}
  </div>

  <!-- Handle -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    role="separator"
    tabindex="0"
    aria-valuenow={split}
    aria-valuemin={minSize}
    aria-valuemax={100 - minSize}
    aria-orientation={direction}
    class="relative z-10 flex items-center justify-center bg-gray-200 hover:bg-primary hover:shadow-md transition-colors
      {direction === 'horizontal' ? 'w-1 cursor-col-resize hover:w-1.5' : 'h-1 cursor-row-resize hover:h-1.5'}
      {isDragging ? 'bg-primary w-1.5 h-1.5' : ''}"
    onmousedown={handleMouseDown}
  >
    <div class="absolute inset-0 -m-2"></div> <!-- Hit area expander -->
  </div>

  <!-- Second Pane -->
  <div style="flex-basis: {100 - split}%" class="relative overflow-auto">
    {@render second()}
  </div>
</div>
