<script lang="ts">
  import { type Snippet } from 'svelte';
  import { slide } from 'svelte/transition';

  let {
    value = $bindable(''),
    label,
    error = undefined,
    disabled = false,
    min = undefined,
    max = undefined,
    id = crypto.randomUUID(),
    class: className = '',
    ...rest
  }: {
    value?: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    min?: string;
    max?: string;
    id?: string;
    class?: string;
    [key: string]: any;
  } = $props();

  let isOpen = $state(false);
  let currentMonth = $state(new Date());
  
  let inputValue = $state('');
  
  // Initialize currentMonth and inputValue from value if present
  $effect(() => {
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        currentMonth = date;
        // Format YYYY-MM-DD to dd/mm/YYYY for display
        const [y, m, d] = value.split('-');
        inputValue = `${d}/${m}/${y}`;
      }
    }
  });

  function handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const inputType = (e as InputEvent).inputType;
    
    // If deleting, do nothing special to allow user to correct mistakes
    if (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward') {
      inputValue = input.value;
    } else {
      // Auto-format: insert slashes automatically
      let raw = input.value.replace(/\D/g, '');
      if (raw.length > 8) raw = raw.slice(0, 8);
      
      let formatted = '';
      if (raw.length > 0) formatted += raw.slice(0, 2);
      if (raw.length >= 2) formatted += '/';
      if (raw.length > 2) formatted += raw.slice(2, 4);
      if (raw.length >= 4) formatted += '/';
      if (raw.length > 4) formatted += raw.slice(4, 8);
      
      inputValue = formatted;
    }
    
    // Parse dd/mm/YYYY
    const match = inputValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      
      const date = new Date(year, month - 1, day);
      
      if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        value = `${y}-${m}-${d}`;
        currentMonth = date;
      }
    }
  }

  function getDaysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  }

  let calendarData = $derived.by(() => {
    const { days, firstDay } = getDaysInMonth(currentMonth);
    const daysArray = Array.from({ length: days }, (_, i) => i + 1);
    const padding = Array.from({ length: firstDay }, () => null);
    return [...padding, ...daysArray];
  });

  function toggle() {
    if (!disabled) isOpen = !isOpen;
  }

  function selectDate(day: number) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    // Format as YYYY-MM-DD to match native date input format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    value = `${year}-${month}-${d}`;
    isOpen = false;
  }

  function nextMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  }

  function prevMonth() {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  }

  function handleOutsideClick(event: MouseEvent) {
    if (isOpen && !(event.target as Element).closest(`#datepicker-container-${id}`)) {
      isOpen = false;
    }
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
</script>

<svelte:window onclick={handleOutsideClick} />

<div class="w-full space-y-1 {className}" id="datepicker-container-{id}">
  {#if label}
    <label for={id} class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
  {/if}
  
  <div class="relative">
    <div class="relative">
      <input
        type="text"
        {id}
        value={inputValue}
        oninput={handleInput}
        onfocus={() => isOpen = true}
        placeholder="dd/mm/YYYY"
        {disabled}
        class="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 {error ? 'border-red-500 focus:ring-red-500' : ''}"
        autocomplete="off"
        {...rest}
      />
      <button
        type="button"
        onclick={toggle}
        class="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-primary focus:outline-none"
        tabindex="-1"
        aria-label="Open calendar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
      </button>
    </div>

    {#if isOpen}
      <div
        class="absolute z-50 mt-1 w-64 rounded-md border border-primary-100 bg-white p-4 shadow-md ring-1 ring-black/5 focus:outline-none"
        transition:slide={{ duration: 150 }}
        role="dialog"
      >
        <div class="flex items-center justify-between mb-4">
          <button onclick={prevMonth} class="p-1 hover:bg-gray-100 rounded-full" aria-label="Previous month">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span class="text-sm font-semibold">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
          <button onclick={nextMonth} class="p-1 hover:bg-gray-100 rounded-full" aria-label="Next month">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div class="grid grid-cols-7 gap-1 text-center text-xs mb-2">
          {#each ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as day}
            <span class="text-gray-500 font-medium">{day}</span>
          {/each}
        </div>

        <div class="grid grid-cols-7 gap-1 text-center">
          {#each calendarData as day}
            {#if day === null}
              <span></span>
            {:else}
              {@const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`}
              {@const isSelected = value === dateStr}
              {@const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString()}
              
              <button
                onclick={() => selectDate(day)}
                class="h-8 w-8 rounded-full text-sm flex items-center justify-center hover:bg-primary-100 transition-colors
                  {isSelected ? 'bg-primary text-white hover:bg-primary-700' : ''}
                  {!isSelected && isToday ? 'text-primary font-bold' : ''}"
              >
                {day}
              </button>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if error}
    <p class="text-xs text-red-500">{error}</p>
  {/if}
</div>
