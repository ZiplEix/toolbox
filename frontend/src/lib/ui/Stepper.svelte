<script lang="ts">
  import { type Snippet } from 'svelte';

  type Step = {
    label: string;
    description?: string;
    icon?: Snippet;
  };

  let {
    steps = [],
    currentStep = 0,
    class: className = '',
    ...rest
  }: {
    steps: Step[];
    currentStep: number;
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<div class="w-full {className}" {...rest}>
  <div class="relative flex items-center justify-between">
    <!-- Connecting line -->
    <div class="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200 -z-10"></div>
    <div 
      class="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-300 -z-10"
      style="width: {(currentStep / (steps.length - 1)) * 100}%"
    ></div>

    {#each steps as step, i}
      {@const isCompleted = i < currentStep}
      {@const isCurrent = i === currentStep}
      
      <div class="flex flex-col items-center bg-surface px-2">
        <div 
          class="flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-300
            {isCompleted || isCurrent ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white text-gray-500'}"
        >
          {#if isCompleted}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          {:else if step.icon}
            <span class="h-4 w-4">{@render step.icon()}</span>
          {:else}
            <span class="text-sm font-medium">{i + 1}</span>
          {/if}
        </div>
        
        <div class="mt-2 text-center">
          <div class="text-sm font-medium {isCurrent ? 'text-primary' : 'text-gray-900'}">{step.label}</div>
          {#if step.description}
            <div class="text-xs text-gray-500">{step.description}</div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
