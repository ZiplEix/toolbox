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
        title: 'JSON Formatter',
        description: 'A simple tool to format and validate JSON data.',
        link: 'https://github.com/baptiste/json-formatter',
        githubLink: 'https://github.com/baptiste/json-formatter',
        isExternal: true
    },
    {
        title: 'Regex Tester',
        description: 'Test and debug regular expressions in real-time.',
        link: 'https://github.com/baptiste/regex-tester',
        githubLink: 'https://github.com/baptiste/regex-tester',
        isExternal: true
    },
    {
        title: 'Color Palette Generator',
        description: 'Generate beautiful color palettes for your projects.',
        link: 'https://github.com/baptiste/color-palette',
        githubLink: 'https://github.com/baptiste/color-palette',
        isExternal: true
    }
];
