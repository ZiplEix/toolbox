<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  let {
    trigger,
    children,
    position = 'bottom',
    class: className = '',
    ...rest
  }: {
    trigger: Snippet;
    children: Snippet;
    position?: 'top' | 'bottom' | 'left' | 'right';
    class?: string;
    [key: string]: any;
  } = $props();

  let isOpen = $state(false);
  let popoverElement: HTMLElement | undefined = $state();
  let triggerElement: HTMLElement | undefined = $state();

  function toggle() {
    isOpen = !isOpen;
  }

  function close() {
    isOpen = false;
  }

  function handleOutsideClick(event: MouseEvent) {
    if (
      isOpen &&
      popoverElement &&
      !popoverElement.contains(event.target as Node) &&
      triggerElement &&
      !triggerElement.contains(event.target as Node)
    ) {
      close();
    }
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };
</script>

<svelte:window onclick={handleOutsideClick} />

<div class="relative inline-block {className}" {...rest}>
  <div bind:this={triggerElement} onclick={toggle} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && toggle()}>
    {@render trigger()}
  </div>

  {#if isOpen}
    <div
      bind:this={popoverElement}
      class="absolute z-50 w-72 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 focus:outline-none {positionClasses[position]}"
      transition:scale={{ duration: 150, start: 0.95 }}
      role="dialog"
    >
      {@render children()}
    </div>
  {/if}
</div>
