<script lang="ts">
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { TreeView, Button } from "$lib/ui";
    import { components, categories } from "./data";
    import type { TreeNode } from "$lib/ui/TreeView.svelte";

    let { children } = $props();

    // Transform components data into TreeView nodes
    const treeNodes: TreeNode[] = categories.map((category) => ({
        id: category,
        label: category,
        children: components
            .filter((c) => c.category === category)
            .map((c) => ({
                id: c.name,
                label: c.name,
            })),
    }));

    let selectedId = $state($page.params.name || "");

    $effect(() => {
        if (selectedId && selectedId !== $page.params.name) {
            // Check if it's a category or a component
            const isComponent = components.some((c) => c.name === selectedId);
            if (isComponent) {
                goto(`/ui-kit/${selectedId}`);
            }
        }
    });

    $effect(() => {
        // Sync selection with URL
        if ($page.params.name) {
            selectedId = $page.params.name;
        } else {
            selectedId = "";
        }
    });
</script>

<div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 border-r bg-white overflow-y-auto flex-shrink-0">
        <div class="p-4 border-b sticky top-0 bg-white z-10">
            <a
                href="/ui-kit"
                class="text-xl font-bold text-primary-900 block mb-2"
                >UI Kit Docs</a
            >
            <a
                href="/"
                class="text-sm text-gray-500 hover:text-primary flex items-center gap-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg
                >
                Back to Home
            </a>
        </div>
        <div class="p-2">
            <TreeView nodes={treeNodes} bind:selectedId />
        </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-8">
        <div class="max-w-4xl mx-auto">
            {@render children()}
        </div>
    </main>
</div>
