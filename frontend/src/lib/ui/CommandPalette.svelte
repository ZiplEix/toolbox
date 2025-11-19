<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  type CommandItem = {
    id: string;
    label: string;
    icon?: Snippet;
    shortcut?: string;
    action: () => void;
  };

  type CommandGroup = {
    heading: string;
    items: CommandItem[];
  };

  let {
    open = $bindable(false),
    groups = [],
    placeholder = 'Type a command or search...',
    class: className = '',
    ...rest
  }: {
    open?: boolean;
    groups: CommandGroup[];
    placeholder?: string;
    class?: string;
    [key: string]: any;
  } = $props();

  let searchQuery = $state('');
  let selectedIndex = $state(0);
  let filteredGroups = $derived.by(() => {
    if (!searchQuery) return groups;
    
    return groups.map(group => ({
      ...group,
      items: group.items.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(group => group.items.length > 0);
  });

  let flatItems = $derived(filteredGroups.flatMap(g => g.items));

  function close() {
    open = false;
    searchQuery = '';
    selectedIndex = 0;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (e.repeat) return;
      open = !open;
      return;
    }

    if (!open) return;

    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % flatItems.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + flatItems.length) % flatItems.length;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = flatItems[selectedIndex];
      if (item) {
        item.action();
        close();
      }
    }
  }

  $effect(() => {
    if (open) {
      // Reset selection when opening
      selectedIndex = 0;
    }
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
    transition:fade={{ duration: 150 }}
    onclick={close}
    role="presentation"
  ></div>

  <div
    class="fixed left-1/2 top-[20%] z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 {className}"
    transition:scale={{ duration: 150, start: 0.95 }}
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-center border-b px-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-5 w-5 text-gray-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <!-- svelte-ignore a11y_autofocus -->
      <input
        type="text"
        bind:value={searchQuery}
        class="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        {placeholder}
        autofocus
      />
    </div>
    
    <div class="max-h-[300px] overflow-y-auto p-2">
      {#if filteredGroups.length === 0}
        <div class="py-6 text-center text-sm text-gray-500">No results found.</div>
      {:else}
        {#each filteredGroups as group}
          <div class="mb-2">
            <div class="px-2 py-1.5 text-xs font-medium text-gray-500">{group.heading}</div>
            {#each group.items as item}
              {@const isSelected = flatItems[selectedIndex] === item}
              <button
                type="button"
                class="flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none {isSelected ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}"
                onclick={() => {
                  item.action();
                  close();
                }}
                onmouseenter={() => selectedIndex = flatItems.indexOf(item)}
              >
                {#if item.icon}
                  <span class="mr-2 h-4 w-4 {isSelected ? 'text-white' : 'text-gray-500'}">{@render item.icon()}</span>
                {/if}
                <span class="flex-1 text-left">{item.label}</span>
                {#if item.shortcut}
                  <span class="ml-auto text-xs tracking-widest {isSelected ? 'text-primary-100' : 'text-gray-400'}">{item.shortcut}</span>
                {/if}
              </button>
            {/each}
          </div>
        {/each}
      {/if}
    </div>
    
    <div class="border-t bg-gray-50 px-4 py-2 text-xs text-gray-500 flex justify-between">
      <span>Pro tip: Use arrow keys to navigate</span>
      <span>ESC to close</span>
    </div>
  </div>
{/if}
