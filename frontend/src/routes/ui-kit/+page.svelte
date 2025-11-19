<script lang="ts">
    import { Card, Badge, Button } from "$lib/ui";
    import { components, categories } from "./data";
</script>

<div class="space-y-8">
    <div class="flex items-end justify-between">
        <div class="space-y-2">
            <h1 class="text-3xl font-bold text-gray-900">
                Welcome to Purple UI Kit
            </h1>
            <p class="text-gray-600 text-lg">
                A comprehensive collection of minimalist, elegant components for
                Svelte 5.
            </p>
        </div>
        <Button
            href="/UI_KIT_LLM.md"
            download="UI_KIT_LLM.md"
            variant="outline"
        >
            Download LLM Docs
        </Button>
    </div>

    {#each categories as category}
        <section class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800 border-b pb-2">
                {category}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each components.filter((c) => c.category === category) as component}
                    <a href="/ui-kit/{component.name}" class="block group">
                        <Card
                            class="h-full transition-all hover:shadow-md hover:border-primary-200"
                        >
                            {#snippet header()}
                                <div class="flex items-center justify-between">
                                    <h3
                                        class="font-semibold text-gray-900 group-hover:text-primary"
                                    >
                                        {component.name}
                                    </h3>
                                    <Badge variant="outline" class="text-xs"
                                        >v1.0</Badge
                                    >
                                </div>
                            {/snippet}
                            <p class="text-sm text-gray-500 line-clamp-2">
                                {component.description}
                            </p>
                        </Card>
                    </a>
                {/each}
            </div>
        </section>
    {/each}
</div>
