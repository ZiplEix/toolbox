<script lang="ts">
  import { type Snippet } from 'svelte';

  let {
    value = $bindable(''),
    label,
    placeholder = '',
    error = undefined,
    disabled = false,
    rows = 4,
    id = crypto.randomUUID(),
    class: className = '',
    ...rest
  }: {
    value?: string;
    label?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    rows?: number;
    id?: string;
    class?: string;
    [key: string]: any;
  } = $props();

  const baseInputStyles = "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200";
  const errorStyles = "border-red-500 focus:ring-red-500";
</script>

<div class="w-full space-y-1 {className}">
  {#if label}
    <label for={id} class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
  {/if}
  
  <textarea
    {id}
    bind:value
    {placeholder}
    {disabled}
    {rows}
    class="{baseInputStyles} {error ? errorStyles : ''}"
    {...rest}
  ></textarea>

  {#if error}
    <p class="text-xs text-red-500">{error}</p>
  {/if}
</div>
