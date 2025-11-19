<script lang="ts">
  let {
    text,
    position = 'center',
    class: className = '',
    ...rest
  }: {
    text?: string;
    position?: 'start' | 'center' | 'end';
    class?: string;
    [key: string]: any;
  } = $props();

  const positionClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end'
  };
</script>

<div class="relative py-4 {className}" {...rest}>
  <div class="absolute inset-0 flex items-center" aria-hidden="true">
    <div class="w-full border-t border-gray-200"></div>
  </div>
  {#if text}
    <div class="relative flex {positionClasses[position]}">
      <span class="bg-white px-2 text-sm text-gray-500">{text}</span>
    </div>
  {/if}
</div>
