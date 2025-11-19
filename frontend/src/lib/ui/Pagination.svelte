<script lang="ts">
  let {
    page = $bindable(1),
    totalPages,
    siblingCount = 1,
    class: className = '',
    ...rest
  }: {
    page: number;
    totalPages: number;
    siblingCount?: number;
    class?: string;
    [key: string]: any;
  } = $props();

  function range(start: number, end: number) {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  let paginationRange = $derived.by(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
    
    return [];
  });

  function setPage(p: number | string) {
    if (typeof p === 'number' && p >= 1 && p <= totalPages) {
      page = p;
    }
  }
</script>

<nav class="flex items-center justify-center space-x-1 {className}" aria-label="Pagination" {...rest}>
  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
    onclick={() => setPage(page - 1)}
    disabled={page === 1}
    aria-label="Previous page"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
  </button>

  {#each paginationRange as pageNumber}
    {#if pageNumber === '...'}
      <span class="inline-flex h-9 w-9 items-center justify-center text-sm text-gray-500">...</span>
    {:else}
      <button
        type="button"
        class="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors
          {page === pageNumber 
            ? 'bg-primary text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary' 
            : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}"
        onclick={() => setPage(pageNumber)}
        aria-current={page === pageNumber ? 'page' : undefined}
      >
        {pageNumber}
      </button>
    {/if}
  {/each}

  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
    onclick={() => setPage(page + 1)}
    disabled={page === totalPages}
    aria-label="Next page"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  </button>
</nav>
