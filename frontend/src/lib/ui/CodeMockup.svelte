<script lang="ts">
  import { type Snippet } from 'svelte';
  import { fade } from 'svelte/transition';

  let {
    children,
    class: className = '',
    ...rest
  }: {
    children: Snippet;
    class?: string;
    [key: string]: any;
  } = $props();

  let codeElement: HTMLElement;
  let copied = $state(false);

  async function copyToClipboard() {
    if (!codeElement) return;
    try {
      await navigator.clipboard.writeText(codeElement.innerText);
      copied = true;
      setTimeout(() => copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
</script>

<div class="w-full rounded-lg bg-gray-900 shadow-lg overflow-hidden {className}" {...rest}>
  <div class="flex items-center justify-between px-4 py-2 bg-gray-800">
    <div class="flex space-x-2">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div class="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <button
      onclick={copyToClipboard}
      class="text-gray-400 hover:text-white transition-colors focus:outline-none"
      aria-label="Copy to clipboard"
    >
      {#if copied}
        <div class="flex items-center space-x-1 text-green-400" transition:fade={{ duration: 150 }}>
          <span class="text-xs">Copied!</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transition:fade={{ duration: 150 }}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      {/if}
    </button>
  </div>
  <div class="p-4 overflow-x-auto">
    <pre class="text-sm text-gray-300 font-mono"><code bind:this={codeElement}>{@render children()}</code></pre>
  </div>
</div>
