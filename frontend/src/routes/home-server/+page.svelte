<script lang="ts">
    import { Card } from "$lib/ui";

    const services = [
        {
            name: "Proxmox",
            url: "https://192.168.1.102:8006",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Logo_Proxmox.svg/1200px-Logo_Proxmox.svg.png?20240424224823",
            description: "Virtualization Platform",
        },
        {
            name: "Nginx Proxy Manager",
            url: "https://proxy.baptiste.zip",
            logo: "https://camo.githubusercontent.com/1d54842e99c00437d405c6a81a5eb954e57cdf7918b02d72328655ab6a95e7f7/68747470733a2f2f6e67696e7870726f78796d616e616765722e636f6d2f6769746875622e706e67",
            description: "Reverse Proxy Management",
        },
        {
            name: "Coolify",
            url: "https://coolify.baptiste.zip/",
            logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/coolify.webp",
            description: "Self-hosting Solution",
        },
        {
            name: "CasaOS",
            url: "https://media.baptiste.zip/",
            logo: "https://wiki.casaos.io/_assets/casaos_logo_hd.svg",
            description: "Personal Cloud OS",
        },
        {
            name: "DNS Manager",
            url: "https://account.squarespace.com/domains/managed/baptiste.zip/dns/dns-settings",
            logo: "https://cdn.worldvectorlogo.com/logos/squarespace.svg",
            description: "Squarespace DNS",
        },
        {
            name: "Coolify (Deprecated)",
            url: "https://coolify.infra.baptiste.zip",
            logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/coolify.webp",
            description: "Old Instance",
            deprecated: true,
        },
    ];
</script>

<div class="container mx-auto p-8">
    <h1
        class="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
    >
        Home Server Dashboard
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each services as service}
            <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                class="block h-full group focus:outline-none"
            >
                <Card
                    class="h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-focus-visible:ring-2 group-focus-visible:ring-ring {service.deprecated
                        ? 'opacity-75 grayscale hover:grayscale-0'
                        : ''}"
                >
                    {#snippet header()}
                        <div
                            class="h-24 w-full flex items-center justify-center p-2"
                        >
                            <img
                                src={service.logo}
                                alt={service.name}
                                class="max-h-full max-w-full object-contain"
                            />
                        </div>
                    {/snippet}

                    <div class="text-center flex-grow">
                        <h3
                            class="font-semibold text-xl text-foreground group-hover:text-primary transition-colors"
                        >
                            {service.name}
                        </h3>
                        <p class="text-sm text-muted-foreground mt-2">
                            {service.description}
                        </p>
                    </div>
                </Card>
            </a>
        {/each}
    </div>
</div>
