<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let {
    open = $bindable(false),
    title,
    children,
    footer,
    position = 'right',
    class: className = '',
    onclose,
  }: {
    open?: boolean;
    title?: string;
    children: Snippet;
    footer?: Snippet;
    position?: 'left' | 'right';
    class?: string;
    onclose?: () => void;
  } = $props();

  function close() {
    open = false;
    onclose?.();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      close();
    }
  }

  const positionClasses = {
    left: 'left-0 top-0 h-full w-80 border-r rounded-r-2xl',
    right: 'right-0 top-0 h-full w-80 border-l rounded-l-2xl'
  };

  const transitionParams = {
    left: { x: -320, duration: 300 },
    right: { x: 320, duration: 300 }
  };
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 h-[100dvh]"
    transition:fade={{ duration: 300 }}
    onclick={close}
    role="presentation"
  ></div>

  <!-- Drawer -->
  <div
    class="fixed z-50 bg-white shadow-xl transition-transform duration-300 ease-in-out {positionClasses[position]} {className}"
    transition:fly={transitionParams[position]}
    role="dialog"
    aria-modal="true"
  >
    <div class="flex h-full flex-col">
      {#if title}
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <h2 class="text-lg font-semibold">{title}</h2>
          <button
            onclick={close}
            class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <span class="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      {/if}

      <div class="flex-1 overflow-y-auto p-6">
        {@render children()}
      </div>

      {#if footer}
        <div class="border-t p-6 bg-gray-50">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}
