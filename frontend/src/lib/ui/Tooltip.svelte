<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade } from 'svelte/transition';

  let {
    children,
    content,
    position = 'top',
    class: className = '',
    ...rest
  }: {
    children: Snippet;
    content: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    class?: string;
    [key: string]: any;
  } = $props();

  let isVisible = $state(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };
</script>

<div
  class="relative inline-block {className}"
  onmouseenter={() => isVisible = true}
  onmouseleave={() => isVisible = false}
  role="tooltip"
  {...rest}
>
  {@render children()}

  {#if isVisible}
    <div
      class="absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm whitespace-nowrap pointer-events-none {positionClasses[position]}"
      transition:fade={{ duration: 150 }}
    >
      {content}
      <!-- Arrow -->
      <div 
        class="absolute w-2 h-2 bg-gray-900 transform rotate-45
        {position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
        {position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
        {position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : ''}
        {position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' : ''}"
      ></div>
    </div>
  {/if}
</div>
