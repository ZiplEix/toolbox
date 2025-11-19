<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade, scale } from 'svelte/transition';

  type Option = {
    value: string;
    label: string;
    disabled?: boolean;
  };

  let {
    options = [],
    value = $bindable(''),
    placeholder = 'Select option...',
    label = '',
    error = '',
    disabled = false,
    class: className = '',
    id = 'combobox-' + Math.random().toString(36).slice(2, 9),
    ...rest
  }: {
    options: Option[];
    value?: string;
    placeholder?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    class?: string;
    id?: string;
    [key: string]: any;
  } = $props();

  let isOpen = $state(false);
  let searchQuery = $state('');
  let containerElement: HTMLElement | undefined = $state();
  let inputElement: HTMLInputElement | undefined = $state();

  let filteredOptions = $derived(
    options.filter(opt => 
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  let selectedOption = $derived(options.find(opt => opt.value === value));

  function toggle() {
    if (disabled) return;
    isOpen = !isOpen;
    if (isOpen) {
      searchQuery = '';
      setTimeout(() => inputElement?.focus(), 0);
    }
  }

  function close() {
    isOpen = false;
    searchQuery = '';
  }

  function select(option: Option) {
    if (option.disabled) return;
    value = option.value;
    close();
  }

  function handleOutsideClick(event: MouseEvent) {
    if (
      isOpen &&
      containerElement &&
      !containerElement.contains(event.target as Node)
    ) {
      close();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (disabled) return;
    
    if (e.key === 'Escape') {
      close();
    }
  }
</script>

<svelte:window onclick={handleOutsideClick} />

<div class="w-full {className}" bind:this={containerElement} {...rest}>
  {#if label}
    <label for={id} class="mb-1.5 block text-sm font-medium text-gray-700">
      {label}
    </label>
  {/if}

  <div class="relative">
    <button
      type="button"
      {id}
      class="relative w-full cursor-default rounded-lg border bg-white py-2.5 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm
        {error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary'}
        {disabled ? 'cursor-not-allowed bg-gray-50 text-gray-500' : ''}"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      onclick={toggle}
      {disabled}
    >
      <span class="block truncate {selectedOption ? 'text-gray-900' : 'text-gray-500'}">
        {selectedOption?.label || placeholder}
      </span>
      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
      </span>
    </button>

    {#if isOpen}
      <div
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        transition:scale={{ duration: 100, start: 0.95 }}
      >
        <div class="sticky top-0 z-10 bg-white px-2 py-1.5 border-b">
          <!-- svelte-ignore a11y_autofocus -->
          <input
            bind:this={inputElement}
            type="text"
            class="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search..."
            bind:value={searchQuery}
            onclick={(e) => e.stopPropagation()}
            autofocus
          />
        </div>

        {#if filteredOptions.length === 0}
          <div class="relative cursor-default select-none px-4 py-2 text-gray-500">
            No results found.
          </div>
        {:else}
          <ul role="listbox" tabindex="-1">
            {#each filteredOptions as option}
              <li
                class="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-primary-50 text-gray-900"
                role="option"
                aria-selected={value === option.value}
                onclick={() => select(option)}
                onkeydown={(e) => e.key === 'Enter' && select(option)}
              >
                <span class="block truncate {value === option.value ? 'font-semibold' : 'font-normal'}">
                  {option.label}
                </span>

                {#if value === option.value}
                  <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                {/if}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}
  </div>

  {#if error}
    <p class="mt-1.5 text-sm text-red-600">{error}</p>
  {/if}
</div>
