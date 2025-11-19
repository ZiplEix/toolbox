<script lang="ts">
  import { type Snippet } from 'svelte';

  type Tab = {
    value: string;
    label: string;
    icon?: Snippet;
  };

  let {
    items = [],
    value = $bindable(''),
    variant = 'default',
    class: className = '',
    ...rest
  }: {
    items: Tab[];
    value?: string;
    variant?: 'default' | 'pills' | 'underline';
    class?: string;
    [key: string]: any;
  } = $props();

  // Set initial value if not provided
  if (!value && items.length > 0) {
    value = items[0].value;
  }

  const variantStyles = {
    default: {
      list: 'border-b border-gray-200',
      item: 'border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300',
      active: 'text-primary border-primary font-medium'
    },
    pills: {
      list: 'bg-gray-100 p-1 rounded-lg',
      item: 'rounded-md hover:text-gray-900',
      active: 'bg-white text-primary shadow-sm font-medium'
    },
    underline: {
      list: 'border-b border-gray-200',
      item: 'border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300',
      active: 'text-primary border-primary font-medium'
    }
  };
</script>

<div class="{className}" {...rest}>
  <div class="flex space-x-1 {variantStyles[variant].list}">
    {#each items as item}
      <button
        type="button"
        class="px-4 py-2 text-sm transition-colors focus:outline-none {variantStyles[variant].item} {value === item.value ? variantStyles[variant].active : 'text-gray-500'}"
        onclick={() => value = item.value}
        role="tab"
        aria-selected={value === item.value}
      >
        <div class="flex items-center space-x-2">
          {#if item.icon}
            {@render item.icon()}
          {/if}
          <span>{item.label}</span>
        </div>
      </button>
    {/each}
  </div>
</div>
