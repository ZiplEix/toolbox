<script module lang="ts">
  export type TreeNode = {
    id: string;
    label: string;
    children?: TreeNode[];
    icon?: import('svelte').Snippet;
  };
</script>

<script lang="ts">
  import { type Snippet } from 'svelte';
  import { slide } from 'svelte/transition';

  let {
    nodes = [],
    selectedId = $bindable(''),
    class: className = '',
    ...rest
  }: {
    nodes: TreeNode[];
    selectedId?: string;
    class?: string;
    [key: string]: any;
  } = $props();

  let expandedIds = $state(new Set<string>());

  function toggle(id: string) {
    if (expandedIds.has(id)) {
      expandedIds.delete(id);
    } else {
      expandedIds.add(id);
    }
    expandedIds = new Set(expandedIds); // Trigger reactivity
  }

  function select(id: string) {
    selectedId = id;
  }
</script>

<!-- Recursive Snippet -->
{#snippet treeNode(node: TreeNode, level: number = 0)}
  <div class="select-none">
    <button
      type="button"
      class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors
        {selectedId === node.id ? 'bg-primary-50 text-primary' : 'text-gray-700 hover:bg-gray-100'}"
      style="padding-left: {level * 1.5 + 0.5}rem"
      onclick={() => {
        if (node.children?.length) toggle(node.id);
        select(node.id);
      }}
    >
      <!-- Chevron -->
      {#if node.children?.length}
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
          class="h-4 w-4 text-gray-400 transition-transform {expandedIds.has(node.id) ? 'rotate-90' : ''}"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      {:else}
        <span class="w-4"></span>
      {/if}

      <!-- Icon -->
      {#if node.icon}
        <span class="h-4 w-4">{@render node.icon()}</span>
      {:else if node.children}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-blue-500"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-gray-400"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4h4"/></svg>
      {/if}

      <span class="truncate">{node.label}</span>
    </button>

    {#if node.children && expandedIds.has(node.id)}
      <div transition:slide={{ duration: 150 }}>
        {#each node.children as child}
          {@render treeNode(child, level + 1)}
        {/each}
      </div>
    {/if}
  </div>
{/snippet}

<div class="{className}" {...rest}>
  {#each nodes as node}
    {@render treeNode(node)}
  {/each}
</div>
