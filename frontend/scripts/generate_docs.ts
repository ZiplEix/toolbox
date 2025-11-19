import { components } from '../src/routes/ui-kit/data.ts';
import { writeFileSync } from 'fs';
import { join } from 'path';

const categories = [...new Set(components.map(c => c.category))];

let md = '# UI Kit Documentation\n\n';
md += 'This documentation describes the components available in the UI Kit, including their props, events, slots, and usage examples.\n\n';

categories.forEach(category => {
    md += `## ${category}\n\n`;

    const categoryComponents = components.filter(c => c.category === category);

    categoryComponents.forEach(component => {
        md += `### ${component.name}\n\n`;
        md += `${component.description}\n\n`;

        if (component.props.length > 0) {
            md += '**Props**\n\n';
            md += '| Name | Type | Default | Description |\n';
            md += '|---|---|---|---|\n';
            component.props.forEach(prop => {
                md += `| \`${prop.name}\` | \`${prop.type}\` | \`${prop.default || '-'}\` | ${prop.description} |\n`;
            });
            md += '\n';
        }

        if (component.events && component.events.length > 0) {
            md += '**Events**\n\n';
            component.events.forEach(event => {
                md += `- \`${event.name}\`: ${event.description}\n`;
            });
            md += '\n';
        }

        if (component.slots && component.slots.length > 0) {
            md += '**Slots**\n\n';
            component.slots.forEach(slot => {
                md += `- \`${slot.name}\`: ${slot.description}\n`;
            });
            md += '\n';
        }

        md += '**Example**\n\n';
        md += '```svelte\n';
        md += component.example + '\n';
        md += '```\n\n';

        md += '---\n\n';
    });
});

writeFileSync(join(process.cwd(), 'static', 'UI_KIT_LLM.md'), md);
console.log('Documentation generated successfully!');
