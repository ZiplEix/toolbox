<script lang="ts">
  import { type Snippet } from 'svelte';
  import { slide } from 'svelte/transition';

  type Option = {
    value: string;
    label: string;
  };

  let {
    value = $bindable(''),
    options = [],
    label,
    placeholder = 'Select an option',
    error = undefined,
    disabled = false,
    id = crypto.randomUUID(),
    class: className = '',
    ...rest
  }: {
    value?: string;
    options: Option[];
    label?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    id?: string;
    class?: string;
    [key: string]: any;
  } = $props();

  let isOpen = $state(false);
  let selectedLabel = $derived(options.find(o => o.value === value)?.label || '');

  function toggle() {
    if (!disabled) isOpen = !isOpen;
  }

  function select(option: Option) {
    value = option.value;
    isOpen = false;
  }

  function handleOutsideClick(event: MouseEvent) {
    if (isOpen && !(event.target as Element).closest(`#select-container-${id}`)) {
      isOpen = false;
    }
  }
</script>

<svelte:window onclick={handleOutsideClick} />

<div class="w-full space-y-1 {className}" id="select-container-{id}">
  {#if label}
    <label for={id} class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
  {/if}
  
  <div class="relative">
    <button
      type="button"
      {id}
      onclick={toggle}
      {disabled}
      class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {error ? 'border-red-500 focus:ring-red-500' : ''}"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      {...rest}
    >
      <span class={!value ? 'text-gray-400' : ''}>{value ? selectedLabel : placeholder}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-4 w-4 opacity-50 transition-transform {isOpen ? 'rotate-180' : ''}"><path d="m6 9 6 6 6-6"/></svg>
    </button>

    {#if isOpen}
      <div
        class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-primary-100 bg-white p-1 shadow-md ring-1 ring-black/5 focus:outline-none"
        transition:slide={{ duration: 150 }}
        role="listbox"
      >
        {#each options as option}
          <button
            type="button"
            class="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-primary-50 hover:text-primary-900 {value === option.value ? 'bg-primary-50 text-primary-900 font-medium' : 'text-gray-900'}"
            onclick={() => select(option)}
            role="option"
            aria-selected={value === option.value}
          >
            <span class="block truncate">{option.label}</span>
            {#if value === option.value}
              <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-primary-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  {#if error}
    <p class="text-xs text-red-500">{error}</p>
  {/if}
</div>
