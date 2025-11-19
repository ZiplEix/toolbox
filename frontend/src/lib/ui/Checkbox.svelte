<script lang="ts">
  let {
    checked = $bindable(false),
    disabled = false,
    label,
    class: className = '',
    ...rest
  }: {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<label class="inline-flex items-center gap-2 cursor-pointer {disabled ? 'opacity-50 cursor-not-allowed' : ''} {className}">
  <div class="relative flex items-center">
    <input
      type="checkbox"
      bind:checked
      {disabled}
      class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground appearance-none checked:bg-primary checked:border-primary"
      {...rest}
    />
    <svg
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </div>
  {#if label}
    <span class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </span>
  {/if}
</label>
