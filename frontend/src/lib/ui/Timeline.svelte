<script lang="ts">
  import { type Snippet } from 'svelte';

  type TimelineItem = {
    date: string;
    title: string;
    description?: string;
    icon?: Snippet;
  };

  let {
    items = [],
    class: className = '',
    ...rest
  }: {
    items: TimelineItem[];
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<div class="space-y-8 {className}" {...rest}>
  {#each items as item, i}
    <div class="relative flex gap-6">
      <!-- Connector line -->
      {#if i !== items.length - 1}
        <div class="absolute left-[19px] top-10 h-full w-0.5 bg-gray-200"></div>
      {/if}

      <!-- Icon/Dot -->
      <div class="relative flex h-10 w-10 flex-none items-center justify-center rounded-full bg-surface ring-1 ring-gray-200 shadow-sm">
        {#if item.icon}
          <span class="text-gray-500">{@render item.icon()}</span>
        {:else}
          <div class="h-2.5 w-2.5 rounded-full bg-primary"></div>
        {/if}
      </div>

      <!-- Content -->
      <div class="flex-auto py-0.5">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 class="text-base font-semibold text-gray-900">{item.title}</h3>
          <time class="text-sm text-gray-500">{item.date}</time>
        </div>
        {#if item.description}
          <p class="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
        {/if}
      </div>
    </div>
  {/each}
</div>
