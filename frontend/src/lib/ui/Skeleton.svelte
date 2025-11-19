<script lang="ts">
  let {
    class: className = '',
    width = '100%',
    height = '1rem',
    circle = false,
    ...rest
  }: {
    class?: string;
    width?: string;
    height?: string;
    circle?: boolean;
    [key: string]: any;
  } = $props();
</script>

<div
  class="animate-pulse bg-gray-200 {className} {circle ? 'rounded-full' : 'rounded-md'}"
  style="width: {width}; height: {height};"
  {...rest}
></div>
