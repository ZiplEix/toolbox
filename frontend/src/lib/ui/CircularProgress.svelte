<script lang="ts">
  let {
    value = undefined,
    max = 100,
    size = 40,
    strokeWidth = 4,
    class: className = '',
    ...rest
  }: {
    value?: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    class?: string;
    [key: string]: any;
  } = $props();

  // Use a fixed viewBox for consistent stroke calculations in indeterminate mode
  // but allow scaling via width/height
  const viewBoxSize = 40;
  const radius = (viewBoxSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  // For determinate state
  const offset = $derived(value === undefined ? 0 : circumference - (value / max) * circumference);
  const isIndeterminate = $derived(value === undefined);
</script>

<div
  class="relative inline-flex items-center justify-center {className}"
  style="width: {size}px; height: {size}px;"
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={max}
  aria-valuenow={value}
  {...rest}
>
  <svg
    class="transform {isIndeterminate ? 'animate-spin' : '-rotate-90 transition-all duration-500 ease-in-out'}"
    width="100%"
    height="100%"
    viewBox="0 0 {viewBoxSize} {viewBoxSize}"
  >
    <!-- Background circle -->
    <circle
      class="text-primary-100"
      stroke="currentColor"
      stroke-width={strokeWidth}
      fill="transparent"
      r={radius}
      cx={viewBoxSize / 2}
      cy={viewBoxSize / 2}
    />
    <!-- Progress circle -->
    <circle
      class="text-primary {isIndeterminate ? 'indeterminate-circle' : 'transition-all duration-500 ease-in-out'}"
      stroke="currentColor"
      stroke-width={strokeWidth}
      stroke-linecap="round"
      fill="transparent"
      r={radius}
      cx={viewBoxSize / 2}
      cy={viewBoxSize / 2}
      style={isIndeterminate 
        ? `stroke-dasharray: ${circumference}; transform-origin: center;` 
        : `stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};`}
    />
  </svg>
</div>

<style>
  .indeterminate-circle {
    animation: circle-dash 1.5s ease-in-out infinite;
  }

  @keyframes circle-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -124px;
    }
  }
</style>
