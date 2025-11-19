<script lang="ts">
  import { type Snippet } from 'svelte';

  let {
    headers = [],
    rows = [],
    caption,
    class: className = '',
    ...rest
  }: {
    headers: string[];
    rows: (string | number | Snippet)[][];
    caption?: string;
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<div class="relative w-full overflow-auto rounded-lg border shadow-sm {className}" {...rest}>
  <table class="w-full caption-bottom text-sm text-left">
    {#if caption}
      <caption class="mt-4 text-sm text-gray-500">{caption}</caption>
    {/if}
    <thead class="[&_tr]:border-b bg-gray-50">
      <tr class="border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50">
        {#each headers as header}
          <th class="h-12 px-4 align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0">
            {header}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="[&_tr:last-child]:border-0">
      {#each rows as row}
        <tr class="border-b transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50">
          {#each row as cell}
            <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">
              {#if typeof cell === 'function'}
                {@render cell()}
              {:else}
                {cell}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
