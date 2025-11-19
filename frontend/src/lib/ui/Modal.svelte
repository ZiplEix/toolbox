<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  let {
    open = $bindable(false),
    title,
    children,
    footer,
    class: className = '',
    onclose,
  }: {
    open?: boolean;
    title?: string;
    children: Snippet;
    footer?: Snippet;
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
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-200"
    transition:fade={{ duration: 200 }}
    onclick={close}
    role="presentation"
  ></div>

  <!-- Dialog -->
  <div
    class="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg sm:rounded-2xl {className}"
    transition:scale={{ duration: 200, start: 0.95 }}
    role="dialog"
    aria-modal="true"
  >
    {#if title}
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold leading-none tracking-tight">{title}</h2>
        <button
          onclick={close}
          class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <span class="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    {/if}

    <div class="space-y-4">
      {@render children()}
    </div>

    {#if footer}
      <div class="mt-6 flex justify-end space-x-2">
        {@render footer()}
      </div>
    {/if}
  </div>
{/if}
