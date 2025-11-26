<script lang="ts">
    import { tools } from "$lib/data/tools";
    import Card from "$lib/ui/Card.svelte";
</script>

<div class="container mx-auto p-8">
    <div class="mb-12 text-center">
        <div class="flex justify-center mb-6">
            <img
                src="/favicon.png"
                alt="Toolbox Logo"
                class="w-24 h-24 object-contain"
            />
        </div>
        <h1
            class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
        >
            My Toolbox
        </h1>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of tools and utilities I've built.
        </p>
    </div>

    <div class="flex flex-wrap justify-center gap-6">
        {#each tools as tool}
            <a
                href={tool.link}
                class="block w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)] group no-underline"
                target={tool.isExternal ? "_blank" : undefined}
                rel={tool.isExternal ? "noopener noreferrer" : undefined}
            >
                <Card
                    class="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
                >
                    {#snippet header()}
                        <div class="flex justify-between items-start w-full">
                            <h3
                                class="text-xl font-semibold text-foreground group-hover:text-primary transition-colors"
                            >
                                {tool.title}
                            </h3>
                            {#if tool.isExternal}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="text-muted-foreground group-hover:text-primary transition-colors"
                                >
                                    <path
                                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                    ></path>
                                    <polyline points="15 3 21 3 21 9"
                                    ></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            {/if}
                        </div>
                    {/snippet}

                    <p class="text-muted-foreground leading-relaxed">
                        {tool.description}
                    </p>

                    {#snippet footer()}
                        {#if tool.githubLink}
                            <div
                                class="w-full flex justify-end mt-auto pt-4 border-t border-border/50"
                            >
                                <a
                                    href={tool.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-md hover:bg-muted"
                                    onclick={(e) => e.stopPropagation()}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path
                                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                        ></path>
                                    </svg>
                                    Source
                                </a>
                            </div>
                        {/if}
                    {/snippet}
                </Card>
            </a>
        {/each}
    </div>
</div>
