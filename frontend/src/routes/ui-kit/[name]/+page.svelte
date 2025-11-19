<script lang="ts">
    import { page } from "$app/stores";
    import {
        CodeMockup,
        Table,
        Badge,
        Divider,
        Alert,
        Button,
        toast,
    } from "$lib/ui";
    import * as UI from "$lib/ui";
    import { getComponent } from "../data";

    let componentName = $derived($page.params.name ?? "");
    let component = $derived(getComponent(componentName));
    let ComponentToRender = $derived(
        UI[componentName as keyof typeof UI] as any,
    );

    let isOpen = $state(false);

    // Reset state when component changes
    $effect(() => {
        componentName;
        isOpen = false;
    });

    const propHeaders = ["Name", "Type", "Default", "Description"];
    const eventHeaders = ["Name", "Description"];
    const slotHeaders = ["Name", "Description"];
</script>

{#if component}
    <div class="space-y-8">
        <header class="space-y-4">
            <div class="flex items-center gap-3">
                <h1 class="text-4xl font-bold text-gray-900">
                    {component.name}
                </h1>
                <Badge>{component.category}</Badge>
            </div>
            <p class="text-xl text-gray-600">{component.description}</p>
        </header>

        <Divider />

        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">Preview</h2>
            <div
                class="p-8 border rounded-lg bg-gray-50 flex items-center justify-center min-h-[200px]"
            >
                {#if ComponentToRender}
                    {#if component.name === "Modal" || component.name === "Drawer"}
                        <Button onclick={() => (isOpen = true)}
                            >Open {component.name}</Button
                        >
                        {#snippet defaultContent()}
                            <div class="p-4">
                                <p>
                                    This is the content of the {component.name}.
                                </p>
                                <p class="text-gray-500 text-sm mt-2">
                                    Click the backdrop or close button to
                                    dismiss.
                                </p>
                            </div>
                        {/snippet}
                        <!-- @ts-ignore -->
                        <ComponentToRender
                            bind:open={isOpen}
                            children={defaultContent}
                            {...component.previewProps || {}}
                        />
                    {:else if component.name === "CommandPalette"}
                        <Button onclick={() => (isOpen = true)}
                            >Open CommandPalette</Button
                        >
                        <!-- @ts-ignore -->
                        <ComponentToRender
                            bind:open={isOpen}
                            {...component.previewProps || {}}
                        />
                    {:else if component.name === "Toast"}
                        <Button
                            onclick={() =>
                                toast.add(
                                    "This is a test notification",
                                    "info",
                                )}>Trigger Toast</Button
                        >
                        <!-- @ts-ignore -->
                        <ComponentToRender />
                    {:else if component.name === "DropdownMenu"}
                        {#snippet dropdownTrigger()}
                            <Button>Open Menu</Button>
                        {/snippet}
                        <!-- @ts-ignore -->
                        <ComponentToRender
                            trigger={dropdownTrigger}
                            {...component.previewProps || {}}
                        />
                    {:else if component.name === "Popover"}
                        {#snippet popoverTrigger()}
                            <Button>Open Popover</Button>
                        {/snippet}
                        {#snippet popoverContent()}
                            <div class="p-4">
                                <h3 class="font-semibold mb-2">
                                    Popover Content
                                </h3>
                                <p class="text-sm text-gray-600">
                                    This is the content inside the popover.
                                </p>
                            </div>
                        {/snippet}
                        <!-- @ts-ignore -->
                        <ComponentToRender
                            trigger={popoverTrigger}
                            children={popoverContent}
                            {...component.previewProps || {}}
                        />
                    {:else if component.name === "ResizableSplitter"}
                        <div
                            class="h-64 w-full border rounded-lg overflow-hidden bg-white"
                        >
                            {#snippet first()}
                                <div
                                    class="p-4 h-full bg-gray-50 flex items-center justify-center"
                                >
                                    First Pane
                                </div>
                            {/snippet}
                            {#snippet second()}
                                <div
                                    class="p-4 h-full bg-gray-100 flex items-center justify-center"
                                >
                                    Second Pane
                                </div>
                            {/snippet}
                            <!-- @ts-ignore -->
                            <ComponentToRender
                                {first}
                                {second}
                                {...component.previewProps || {}}
                            />
                        </div>
                    {:else if component.previewProps?.children}
                        <!-- Special handling for children/slots if provided as text -->
                        {#snippet childSnippet()}
                            {component.previewProps?.children}
                        {/snippet}
                        <!-- @ts-ignore -->
                        <ComponentToRender
                            {...component.previewProps || {}}
                            children={childSnippet}
                        />
                    {:else}
                        <!-- @ts-ignore -->
                        <ComponentToRender {...component.previewProps || {}} />
                    {/if}
                {:else}
                    <p class="text-gray-500 italic">
                        Preview not available for {component.name}
                    </p>
                {/if}
            </div>
        </section>

        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">Usage</h2>
            <CodeMockup>
                {component.example}
            </CodeMockup>
        </section>

        <section class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">Props</h2>
            {#if component.props.length > 0}
                <Table
                    headers={propHeaders}
                    rows={component.props.map((p) => [
                        p.name,
                        p.type,
                        p.default || "-",
                        p.description,
                    ])}
                />
            {:else}
                <p class="text-gray-500">No props available.</p>
            {/if}
        </section>

        {#if component.events && component.events.length > 0}
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-gray-800">Events</h2>
                <Table
                    headers={eventHeaders}
                    rows={component.events.map((e) => [e.name, e.description])}
                />
            </section>
        {/if}

        {#if component.slots && component.slots.length > 0}
            <section class="space-y-4">
                <h2 class="text-2xl font-semibold text-gray-800">Slots</h2>
                <Table
                    headers={slotHeaders}
                    rows={component.slots.map((s) => [s.name, s.description])}
                />
            </section>
        {/if}
    </div>
{:else}
    <Alert variant="error" title="Not Found">
        Component "{componentName}" not found.
    </Alert>
{/if}
