<script lang="ts">
  import { type Snippet } from 'svelte';

  type BreadcrumbItem = {
    label: string;
    href?: string;
  };

  let {
    items = [],
    separator = '/',
    class: className = '',
    ...rest
  }: {
    items: BreadcrumbItem[];
    separator?: string | Snippet;
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<nav aria-label="Breadcrumb" class="{className}" {...rest}>
  <ol class="flex items-center space-x-2 text-sm text-gray-500">
    {#each items as item, i}
      <li class="flex items-center">
        {#if i > 0}
          <span class="mx-2 text-gray-400 select-none">
            {#if typeof separator === 'string'}
              {separator}
            {:else}
              {@render separator()}
            {/if}
          </span>
        {/if}
        
        {#if item.href && i < items.length - 1}
          <a href={item.href} class="hover:text-primary hover:underline transition-colors">
            {item.label}
          </a>
        {:else}
          <span class="font-medium text-gray-900" aria-current="page">
            {item.label}
          </span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
