<script lang="ts">
  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    class: className = '',
    ...rest
  }: {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();

  let percentage = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="relative w-full h-6 flex items-center {className}">
  <!-- Track -->
  <div class="absolute w-full h-2 bg-primary-100 rounded-full overflow-hidden">
    <div
      class="h-full bg-primary"
      style="width: {percentage}%"
    ></div>
  </div>

  <!-- Thumb input (invisible but accessible) -->
  <input
    type="range"
    bind:value
    {min}
    {max}
    {step}
    {disabled}
    class="absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-20"
    {...rest}
  />

  <!-- Visible Thumb -->
  <div
    class="absolute h-5 w-5 bg-white border-2 border-primary rounded-full shadow-sm pointer-events-none z-10 transition-transform duration-75"
    style="left: calc({percentage}% - 10px)"
  ></div>
</div>
