<script lang="ts">
  let {
    files = $bindable(undefined),
    accept = undefined,
    multiple = false,
    disabled = false,
    class: className = '',
    ...rest
  }: {
    files?: FileList;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    class?: string;
    [key: string]: any;
  } = $props();

  let isDragging = $state(false);

  function handleDragEnter(e: DragEvent) {
    e.preventDefault();
    if (!disabled) isDragging = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (!disabled && e.dataTransfer?.files) {
      files = e.dataTransfer.files;
    }
  }

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      files = target.files;
    }
  }
</script>

<div
  class="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors
    {isDragging ? 'border-primary bg-primary-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
    {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    {className}"
  ondragenter={handleDragEnter}
  ondragover={handleDragEnter}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  role="region"
  aria-label="File upload drop zone"
>
  <div class="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
    <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
    </svg>
    <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
    <p class="text-xs text-gray-500">
      {#if files && files.length > 0}
        {files.length} file{files.length > 1 ? 's' : ''} selected
      {:else}
        SVG, PNG, JPG or GIF (MAX. 800x400px)
      {/if}
    </p>
  </div>
  <input
    type="file"
    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
    {accept}
    {multiple}
    {disabled}
    onchange={handleChange}
    {...rest}
  />
</div>
