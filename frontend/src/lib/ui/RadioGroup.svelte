<script lang="ts">
  type Option = {
    value: string;
    label: string;
    description?: string;
  };

  let {
    options = [],
    value = $bindable(''),
    name = crypto.randomUUID(),
    label,
    disabled = false,
    class: className = '',
    ...rest
  }: {
    options: Option[];
    value?: string;
    name?: string;
    label?: string;
    disabled?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<div class="space-y-3 {className}" role="radiogroup" aria-labelledby="{name}-label" {...rest}>
  {#if label}
    <span id="{name}-label" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </span>
  {/if}
  
  <div class="space-y-2">
    {#each options as option}
      <div class="flex items-start space-x-3">
        <div class="flex h-6 items-center">
          <input
            id="{name}-{option.value}"
            {name}
            type="radio"
            value={option.value}
            bind:group={value}
            {disabled}
            class="h-4 w-4 border-gray-300 text-primary focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div class="text-sm leading-6">
          <label for="{name}-{option.value}" class="font-medium text-gray-900 {disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}">
            {option.label}
          </label>
          {#if option.description}
            <p class="text-gray-500 {disabled ? 'opacity-50' : ''}">{option.description}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
