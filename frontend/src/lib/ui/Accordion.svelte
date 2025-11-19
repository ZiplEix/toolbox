<script lang="ts">
  import { type Snippet } from 'svelte';
  import { slide } from 'svelte/transition';

  type AccordionItem = {
    id: string;
    title: string;
    content: string | Snippet;
  };

  let {
    items = [],
    multiple = false,
    class: className = '',
    ...rest
  }: {
    items: AccordionItem[];
    multiple?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();

  let openItems = $state<string[]>([]);

  function toggle(id: string) {
    if (openItems.includes(id)) {
      openItems = openItems.filter(i => i !== id);
    } else {
      if (multiple) {
        openItems = [...openItems, id];
      } else {
        openItems = [id];
      }
    }
  }
</script>

<div class="space-y-1 {className}" {...rest}>
  {#each items as item}
    <div class="border rounded-lg overflow-hidden">
      <button
        type="button"
        class="flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-lg"
        onclick={() => toggle(item.id)}
        aria-expanded={openItems.includes(item.id)}
      >
        <span>{item.title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ml-2 h-4 w-4 shrink-0 transition-transform duration-200 {openItems.includes(item.id) ? 'rotate-180' : ''}"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {#if openItems.includes(item.id)}
        <div
          class="px-4 pb-4 pt-0 text-sm text-gray-600"
          transition:slide={{ duration: 200 }}
        >
          <div class="pt-2 border-t border-gray-100">
            {#if typeof item.content === 'string'}
              {item.content}
            {:else}
              {@render item.content()}
            {/if}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>
