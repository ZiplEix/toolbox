<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let {
    targetDate,
    class: className = '',
    ...rest
  }: {
    targetDate: Date;
    class?: string;
    [key: string]: any;
  } = $props();

  let timeLeft = $state({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  let interval: ReturnType<typeof setInterval>;

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(interval);
    }
  }

  onMount(() => {
    calculateTimeLeft();
    interval = setInterval(calculateTimeLeft, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="grid grid-flow-col gap-5 text-center auto-cols-max {className}" {...rest}>
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-4xl">
      <span style="--value:{timeLeft.days};">{timeLeft.days}</span>
    </span>
    days
  </div> 
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-4xl">
      <span style="--value:{timeLeft.hours};">{timeLeft.hours}</span>
    </span>
    hours
  </div> 
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-4xl">
      <span style="--value:{timeLeft.minutes};">{timeLeft.minutes}</span>
    </span>
    min
  </div> 
  <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span class="countdown font-mono text-4xl">
      <span style="--value:{timeLeft.seconds};">{timeLeft.seconds}</span>
    </span>
    sec
  </div>
</div>

<style>
  /* Simplified countdown styles since we don't have DaisyUI's countdown component */
  .countdown {
    display: inline-flex;
  }
  .bg-neutral {
    background-color: var(--color-primary-900);
  }
  .text-neutral-content {
    color: var(--color-primary-50);
  }
  .rounded-box {
    border-radius: var(--radius-lg);
  }
</style>
