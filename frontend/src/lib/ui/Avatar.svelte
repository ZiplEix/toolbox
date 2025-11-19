<script lang="ts">
  let {
    src,
    alt = 'Avatar',
    initials,
    size = 'md',
    class: className = '',
    ...rest
  }: {
    src?: string;
    alt?: string;
    initials?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    class?: string;
    [key: string]: any;
  } = $props();

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg'
  };

  let imageError = $state(false);
</script>

<div class="relative inline-block {className}" {...rest}>
  <div class="relative flex shrink-0 overflow-hidden rounded-full bg-gray-100 {sizeClasses[size]}">
    {#if src && !imageError}
      <img
        {src}
        {alt}
        class="aspect-square h-full w-full object-cover"
        onerror={() => imageError = true}
      />
    {:else}
      <div class="flex h-full w-full items-center justify-center bg-primary-100 text-primary-700 font-medium">
        {initials || alt?.slice(0, 2).toUpperCase() || '??'}
      </div>
    {/if}
  </div>
  <!-- Status indicator slot could go here -->
</div>
