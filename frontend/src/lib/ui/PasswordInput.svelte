<script lang="ts">
  import { type Snippet } from 'svelte';

  let {
    value = $bindable(''),
    label,
    placeholder = '',
    error = undefined,
    disabled = false,
    id = crypto.randomUUID(),
    class: className = '',
    ...rest
  }: {
    value?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    id?: string;
    class?: string;
    [key: string]: any;
  } = $props();

  let showPassword = $state(false);
  const type = $derived(showPassword ? 'text' : 'password');

  const baseInputStyles = "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 pr-10";
  const errorStyles = "border-red-500 focus:ring-red-500";
</script>

<div class="w-full space-y-1 {className}">
  {#if label}
    <label for={id} class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
  {/if}
  
  <div class="relative">
    <input
      {id}
      {type}
      bind:value
      {placeholder}
      {disabled}
      class="{baseInputStyles} {error ? errorStyles : ''}"
      {...rest}
    />
    <button
      type="button"
      onclick={() => showPassword = !showPassword}
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
      {disabled}
    >
      {#if showPassword}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      {/if}
      <span class="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
    </button>
  </div>

  {#if error}
    <p class="text-xs text-red-500">{error}</p>
  {/if}
</div>
