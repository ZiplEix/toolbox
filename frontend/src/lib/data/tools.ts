export interface Tool {
    title: string;
    description: string;
    link: string;
    githubLink?: string;
    isExternal: boolean;
}

export const tools: Tool[] = [
    {
        title: 'UI Kit',
        description: 'A comprehensive, minimalist, purple-themed UI kit using Svelte 5 and Tailwind CSS.',
        link: '/ui-kit',
        githubLink: 'https://github.com/baptiste/toolbox',
        isExternal: false
    },
    {
        title: 'Home Server',
        description: 'A simple dashboard to manage my home server tools.',
        link: '/home-server',
        isExternal: false
    },
    {
        title: 'League of Legends data scraper',
        description: 'Scrape League of Legends match data and timeline.',
        link: '/lol-data-scraper',
        isExternal: false
    },
    {
        title: 'Nexus Analytics',
        description: 'Real-time League of Legends tactical assistant using Live Client Data API and Google Gemini AI.',
        link: 'https://github.com/ZiplEix/nexus-analytics',
        githubLink: 'https://github.com/ZiplEix/nexus-analytics',
        isExternal: true
    }
];
