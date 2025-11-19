<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  type DropdownItem = {
    label: string;
    onClick?: () => void;
    icon?: Snippet;
    danger?: boolean;
    disabled?: boolean;
    href?: string;
  };

  let {
    trigger,
    items = [],
    position = 'bottom-right',
    class: className = '',
    ...rest
  }: {
    trigger: Snippet;
    items: DropdownItem[];
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    class?: string;
    [key: string]: any;
  } = $props();

  let isOpen = $state(false);
  let menuElement: HTMLElement | undefined = $state();
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
      menuElement &&
      !menuElement.contains(event.target as Node) &&
      triggerElement &&
      !triggerElement.contains(event.target as Node)
    ) {
      close();
    }
  }

  function handleItemClick(item: DropdownItem) {
    if (item.disabled) return;
    item.onClick?.();
    close();
  }

  const positionClasses = {
    'bottom-left': 'left-0 top-full mt-2',
    'bottom-right': 'right-0 top-full mt-2',
    'top-left': 'left-0 bottom-full mb-2',
    'top-right': 'right-0 bottom-full mb-2'
  };
</script>

<svelte:window onclick={handleOutsideClick} />

<div class="relative inline-block text-left {className}" {...rest}>
  <div bind:this={triggerElement} onclick={toggle} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && toggle()}>
    {@render trigger()}
  </div>

  {#if isOpen}
    <div
      bind:this={menuElement}
      class="absolute z-50 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none {positionClasses[position]}"
      transition:scale={{ duration: 100, start: 0.95 }}
      role="menu"
      aria-orientation="vertical"
      tabindex="-1"
    >
      <div class="py-1" role="none">
        {#each items as item}
          {#if item.href}
             <a
              href={item.href}
              class="flex items-center px-4 py-2 text-sm {item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} {item.danger ? 'text-red-600' : 'text-gray-700'}"
              role="menuitem"
              tabindex="-1"
              onclick={() => handleItemClick(item)}
            >
              {#if item.icon}
                <span class="mr-2 h-4 w-4">{@render item.icon()}</span>
              {/if}
              {item.label}
            </a>
          {:else}
            <button
              type="button"
              class="flex w-full items-center px-4 py-2 text-sm text-left {item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} {item.danger ? 'text-red-600' : 'text-gray-700'}"
              role="menuitem"
              tabindex="-1"
              disabled={item.disabled}
              onclick={() => handleItemClick(item)}
            >
              {#if item.icon}
                <span class="mr-2 h-4 w-4">{@render item.icon()}</span>
              {/if}
              {item.label}
            </button>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>
