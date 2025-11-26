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
    }
];
