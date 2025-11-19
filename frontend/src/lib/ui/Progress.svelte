<script lang="ts">
  let {
    value = 0,
    max = 100,
    class: className = '',
    ...rest
  }: {
    value?: number;
    max?: number;
    class?: string;
    [key: string]: any;
  } = $props();

  let percentage = $derived(Math.min(100, Math.max(0, (value / max) * 100)));
</script>

<div
  class="relative h-2 w-full overflow-hidden rounded-full bg-primary-100 {className}"
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={max}
  aria-valuenow={value}
  {...rest}
>
  <div
    class="h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out"
    style="transform: translateX(-{100 - percentage}%)"
  ></div>
</div>
