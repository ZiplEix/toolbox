<script lang="ts">
  let {
    value = $bindable(''),
    length = 4,
    placeholder = '○',
    mask = false,
    disabled = false,
    error = false,
    class: className = '',
    oncomplete,
    ...rest
  }: {
    value?: string;
    length?: number;
    placeholder?: string;
    mask?: boolean;
    disabled?: boolean;
    error?: boolean;
    class?: string;
    oncomplete?: (value: string) => void;
    [key: string]: any;
  } = $props();

  let inputs: HTMLInputElement[] = $state([]);
  let values = $state(Array(length).fill(''));

  // Sync internal values with external value prop
  $effect(() => {
    if (value && value.length === length) {
      values = value.split('');
    } else if (!value) {
      values = Array(length).fill('');
    }
  });

  function handleInput(e: Event, index: number) {
    const input = e.target as HTMLInputElement;
    const val = input.value;

    if (!val) return;

    // Handle single character input
    values[index] = val.slice(-1);
    
    // Move to next input
    if (index < length - 1) {
      inputs[index + 1]?.focus();
    }

    updateValue();
  }

  function handleKeydown(e: KeyboardEvent, index: number) {
    if (e.key === 'Backspace') {
      if (!values[index] && index > 0) {
        // If empty and backspace pressed, move to previous and clear it
        inputs[index - 1]?.focus();
        values[index - 1] = '';
        updateValue();
      } else {
        values[index] = '';
        updateValue();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputs[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text').slice(0, length).split('');
    if (pastedData) {
      pastedData.forEach((char, i) => {
        if (i < length) values[i] = char;
      });
      updateValue();
      inputs[Math.min(pastedData.length, length - 1)]?.focus();
    }
  }

  function updateValue() {
    const newValue = values.join('');
    value = newValue;
    if (newValue.length === length) {
      oncomplete?.(newValue);
    }
  }
</script>

<div class="flex gap-2 {className}" {...rest}>
  {#each Array(length) as _, i}
    <input
      bind:this={inputs[i]}
      type={mask ? 'password' : 'text'}
      inputmode="numeric"
      maxlength="1"
      value={values[i]}
      {placeholder}
      {disabled}
      class="h-12 w-12 rounded-lg border text-center text-lg font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50
        {error 
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' 
          : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-primary'}"
      oninput={(e) => handleInput(e, i)}
      onkeydown={(e) => handleKeydown(e, i)}
      onpaste={handlePaste}
    />
  {/each}
</div>
