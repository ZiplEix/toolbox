<script lang="ts">
  import { type Snippet } from 'svelte';

  type Variant = 'info' | 'success' | 'warning' | 'error';

  let {
    children,
    variant = 'info',
    title,
    class: className = '',
    ...rest
  }: {
    children: Snippet;
    variant?: Variant;
    title?: string;
    class?: string;
    [key: string]: any;
  } = $props();

  const variants = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200'
  };

  const iconColors = {
    info: 'text-blue-500',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
  };
</script>

<div
  class="flex p-4 mb-4 text-sm border rounded-lg {variants[variant]} {className}"
  role="alert"
  {...rest}
>
  <svg class="flex-shrink-0 inline w-5 h-5 mr-3 {iconColors[variant]}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    {#if variant === 'info'}
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    {:else if variant === 'success'}
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
    {:else if variant === 'warning'}
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
    {:else if variant === 'error'}
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
    {/if}
  </svg>
  <div>
    {#if title}
      <span class="font-medium">{title}</span>
    {/if}
    <div class={title ? 'mt-1' : ''}>
      {@render children()}
    </div>
  </div>
</div>
