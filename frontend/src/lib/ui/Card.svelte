<script lang="ts">
  import { type Snippet } from 'svelte';

  let {
    children,
    header,
    footer,
    class: className = '',
    ...rest
  }: {
    children: Snippet;
    header?: Snippet;
    footer?: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  const baseStyles = "rounded-xl border border-border bg-card text-card-foreground shadow-sm bg-white";
</script>

<div class="{baseStyles} {className}" {...rest}>
  {#if header}
    <div class="flex flex-col space-y-1.5 p-6">
      {@render header()}
    </div>
  {/if}
  
  <div class="p-6 pt-0 {header ? '' : 'pt-6'}">
    {@render children()}
  </div>

  {#if footer}
    <div class="flex items-center p-6 pt-0">
      {@render footer()}
    </div>
  {/if}
</div>
