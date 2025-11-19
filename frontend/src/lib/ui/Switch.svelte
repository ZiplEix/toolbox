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
  <div class="relative inline-flex items-center">
    <input
      type="checkbox"
      bind:checked
      {disabled}
      class="sr-only peer"
      {...rest}
    />
    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
  </div>
  {#if label}
    <span class="text-sm font-medium text-gray-900">{label}</span>
  {/if}
</label>
