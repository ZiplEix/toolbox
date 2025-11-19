import type { Snippet } from 'svelte';

export type ComponentDoc = {
    name: string;
    description: string;
    category: string;
    props: {
        name: string;
        type: string;
        default?: string;
        description: string;
    }[];
    events?: {
        name: string;
        description: string;
    }[];
    slots?: {
        name: string;
        description: string;
    }[];
    example: string;
    previewProps?: Record<string, any>;
};

export const components: ComponentDoc[] = [
    {
        name: 'Button',
        category: 'General',
        description: 'A versatile button component with multiple variants and sizes.',
        props: [
            { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link'", default: "'primary'", description: 'The visual style of the button.' },
            { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: 'The size of the button.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled.' },
            { name: 'href', type: 'string', default: 'undefined', description: 'If provided, renders as an anchor tag.' },
            { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'The HTML button type.' },
        ],
        events: [
            { name: 'click', description: 'Fired when the button is clicked.' },
        ],
        slots: [
            { name: 'default', description: 'The content of the button.' },
        ],
        example: `<Button variant="primary">Click me</Button>
<Button variant="outline">Cancel</Button>`,
        previewProps: {
            children: 'Button Preview',
            variant: 'primary'
        }
    },
    {
        name: 'Input',
        category: 'Inputs',
        description: 'A standard text input field.',
        props: [
            { name: 'value', type: 'string', default: "''", description: 'The current value of the input.' },
            { name: 'label', type: 'string', default: "''", description: 'Label text displayed above the input.' },
            { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
            { name: 'error', type: 'string', default: "''", description: 'Error message to display.' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled.' },
        ],
        events: [
            { name: 'input', description: 'Fired when the value changes.' },
            { name: 'change', description: 'Fired when the input loses focus or value changes.' },
        ],
        example: `<Input label="Email" placeholder="hello@example.com" bind:value={email} />`,
        previewProps: {
            label: 'Email Address',
            placeholder: 'john@example.com'
        }
    },
    {
        name: 'Card',
        category: 'Data Display',
        description: 'A container for grouping related content.',
        props: [
            { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes.' },
        ],
        slots: [
            { name: 'header', description: 'Content for the card header.' },
            { name: 'default', description: 'Main content of the card.' },
            { name: 'footer', description: 'Content for the card footer.' },
        ],
        example: `<Card>
  {#snippet header()}
    <h3>Card Title</h3>
  {/snippet}
  <p>Card content goes here.</p>
  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Card>`,
        previewProps: {
            // Card slots are hard to pass via props in dynamic component without snippet support in preview
            // We might need a special handling or just simple content
            class: 'w-full max-w-md'
        }
    },
    {
        name: 'Badge',
        category: 'Data Display',
        description: 'A small status indicator.',
        props: [
            { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost'", default: "'primary'", description: 'The visual style of the badge.' },
            { name: 'class', type: 'string', default: "''", description: 'Additional CSS classes.' },
        ],
        slots: [{ name: 'default', description: 'Badge content.' }],
        example: `<Badge variant="primary">New</Badge>`,
        previewProps: {
            children: 'New Feature',
            variant: 'primary'
        }
    },
    {
        name: 'Modal',
        category: 'Overlay',
        description: 'A dialog box that sits on top of other content.',
        props: [
            { name: 'open', type: 'boolean', default: 'false', description: 'Whether the modal is open.' },
            { name: 'title', type: 'string', default: "''", description: 'The title of the modal.' },
        ],
        slots: [
            { name: 'default', description: 'Modal content.' },
            { name: 'footer', description: 'Modal footer content.' },
        ],
        example: `<Modal bind:open={isOpen} title="Confirm">
  <p>Are you sure?</p>
</Modal>`,
        previewProps: {
            title: 'Example Modal',
            open: false // Don't open by default in preview
        }
    },
    {
        name: 'PasswordInput',
        category: 'Inputs',
        description: 'An input field for passwords with visibility toggle.',
        props: [
            { name: 'value', type: 'string', default: "''", description: 'The password value.' },
            { name: 'label', type: 'string', default: "''", description: 'Label text.' },
        ],
        example: `<PasswordInput label="Password" bind:value={password} />`,
        previewProps: {
            label: 'Password'
        }
    },
    {
        name: 'DatePicker',
        category: 'Inputs',
        description: 'A date selection input.',
        props: [
            { name: 'value', type: 'string', default: "''", description: 'The selected date (YYYY-MM-DD).' },
            { name: 'label', type: 'string', default: "''", description: 'Label text.' },
        ],
        example: `<DatePicker label="Birth Date" bind:value={date} />`,
        previewProps: {
            label: 'Select Date'
        }
    },
    {
        name: 'Switch',
        category: 'Inputs',
        description: 'A toggle switch for boolean values.',
        props: [
            { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the switch is on.' },
            { name: 'label', type: 'string', default: "''", description: 'Label text.' },
        ],
        example: `<Switch label="Notifications" bind:checked={enabled} />`,
        previewProps: {
            label: 'Enable Notifications',
            checked: true
        }
    },
    {
        name: 'Checkbox',
        category: 'Inputs',
        description: 'A checkbox for boolean values.',
        props: [
            { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the checkbox is checked.' },
            { name: 'label', type: 'string', default: "''", description: 'Label text.' },
        ],
        example: `<Checkbox label="I agree" bind:checked={agreed} />`,
        previewProps: {
            label: 'I agree to terms',
            checked: true
        }
    },
    {
        name: 'Textarea',
        category: 'Inputs',
        description: 'A multi-line text input.',
        props: [
            { name: 'value', type: 'string', default: "''", description: 'The text value.' },
            { name: 'label', type: 'string', default: "''", description: 'Label text.' },
        ],
        example: `<Textarea label="Message" bind:value={message} />`,
        previewProps: {
            label: 'Comments',
            placeholder: 'Type your message here...'
        }
    },
    {
        name: 'Select',
        category: 'Inputs',
        description: 'A dropdown selection component.',
        props: [
            { name: 'value', type: 'string', default: "''", description: 'The selected value.' },
            { name: 'options', type: '{ value: string, label: string }[]', default: '[]', description: 'List of options.' },
            { name: 'label', type: 'string', default: "''", description: 'Label text.' },
        ],
        example: `<Select label="Country" options={countries} bind:value={country} />`,
        previewProps: {
            label: 'Choose a Fruit',
            options: [
                { value: 'apple', label: 'Apple' },
                { value: 'banana', label: 'Banana' },
                { value: 'cherry', label: 'Cherry' }
            ]
        }
    },
    {
        name: 'Tooltip',
        category: 'Feedback',
        description: 'A popup that displays information on hover.',
        props: [
            { name: 'content', type: 'string', default: "''", description: 'The tooltip text.' },
            { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Tooltip position.' },
        ],
        slots: [{ name: 'default', description: 'The element to trigger the tooltip.' }],
        example: `<Tooltip content="Edit">
  <Button>Hover me</Button>
</Tooltip>`,
        previewProps: {
            content: 'This is a tooltip',
            children: 'Hover me (Tooltip Trigger)' // This might fail if Tooltip expects slot content differently
        }
    },
    {
        name: 'Toast',
        category: 'Feedback',
        description: 'A notification message.',
        props: [],
        example: `// In script
toast.add('Success!', 'success');

// In template
<Toast />`,
        previewProps: {}
    },
    {
        name: 'Progress',
        category: 'Feedback',
        description: 'A linear progress bar.',
        props: [
            { name: 'value', type: 'number', default: '0', description: 'Progress value (0-100).' },
            { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        ],
        example: `<Progress value={50} />`,
        previewProps: {
            value: 60
        }
    },
    {
        name: 'CircularProgress',
        category: 'Feedback',
        description: 'A circular progress indicator.',
        props: [
            { name: 'value', type: 'number', default: 'undefined', description: 'Progress value (0-100). If undefined, indeterminate.' },
            { name: 'size', type: 'number', default: '40', description: 'Diameter in pixels.' },
        ],
        example: `<CircularProgress value={75} />`,
        previewProps: {
            value: 75,
            size: 60
        }
    },
    {
        name: 'Slider',
        category: 'Inputs',
        description: 'A range slider input.',
        props: [
            { name: 'value', type: 'number', default: '0', description: 'Current value.' },
            { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
            { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
        ],
        example: `<Slider bind:value={volume} />`,
        previewProps: {
            value: 30
        }
    },
    {
        name: 'FileInput',
        category: 'Inputs',
        description: 'A file upload input.',
        props: [
            { name: 'files', type: 'FileList', default: 'undefined', description: 'Selected files.' },
            { name: 'accept', type: 'string', default: "''", description: 'Accepted file types.' },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple files.' },
        ],
        example: `<FileInput bind:files={files} />`,
        previewProps: {}
    },
    {
        name: 'Alert',
        category: 'Feedback',
        description: 'A contextual alert message.',
        props: [
            { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Alert style.' },
            { name: 'title', type: 'string', default: "''", description: 'Alert title.' },
        ],
        slots: [{ name: 'default', description: 'Alert content.' }],
        example: `<Alert variant="error" title="Error">Something went wrong.</Alert>`,
        previewProps: {
            variant: 'info',
            title: 'Information',
            children: 'This is an example alert message.'
        }
    },
    {
        name: 'CodeMockup',
        category: 'Data Display',
        description: 'A code snippet display with copy button.',
        props: [],
        slots: [{ name: 'default', description: 'Code content.' }],
        example: `<CodeMockup>npm install</CodeMockup>`,
        previewProps: {
            children: 'console.log("Hello World");'
        }
    },
    {
        name: 'Countdown',
        category: 'Data Display',
        description: 'A countdown timer.',
        props: [
            { name: 'targetDate', type: 'Date', default: 'undefined', description: 'The date to count down to.' },
        ],
        example: `<Countdown targetDate={futureDate} />`,
        previewProps: {
            targetDate: new Date(Date.now() + 10000000)
        }
    },
    {
        name: 'Tabs',
        category: 'Navigation',
        description: 'A tabbed interface.',
        props: [
            { name: 'items', type: '{ value: string, label: string }[]', default: '[]', description: 'Tab items.' },
            { name: 'value', type: 'string', default: "''", description: 'Selected tab value.' },
        ],
        example: `<Tabs items={tabs} bind:value={activeTab} />`,
        previewProps: {
            items: [
                { value: 'tab1', label: 'Account' },
                { value: 'tab2', label: 'Password' },
                { value: 'tab3', label: 'Settings' }
            ],
            value: 'tab1'
        }
    },
    {
        name: 'Breadcrumb',
        category: 'Navigation',
        description: 'A navigation hierarchy trail.',
        props: [
            { name: 'items', type: '{ label: string, href?: string }[]', default: '[]', description: 'Breadcrumb items.' },
        ],
        example: `<Breadcrumb items={crumbs} />`,
        previewProps: {
            items: [
                { label: 'Home', href: '/' },
                { label: 'UI Kit', href: '/ui-kit' },
                { label: 'Breadcrumb' }
            ]
        }
    },
    {
        name: 'Drawer',
        category: 'Overlay',
        description: 'A slide-out panel.',
        props: [
            { name: 'open', type: 'boolean', default: 'false', description: 'Whether the drawer is open.' },
            { name: 'position', type: "'left' | 'right'", default: "'right'", description: 'Drawer position.' },
            { name: 'title', type: 'string', default: "''", description: 'Drawer title.' },
        ],
        slots: [
            { name: 'default', description: 'Drawer content.' },
            { name: 'footer', description: 'Drawer footer.' },
        ],
        example: `<Drawer bind:open={isOpen}>Content</Drawer>`,
        previewProps: {
            title: 'Preview Drawer',
            open: false
        }
    },
    {
        name: 'Avatar',
        category: 'Data Display',
        description: 'A user profile image.',
        props: [
            { name: 'src', type: 'string', default: "''", description: 'Image source URL.' },
            { name: 'alt', type: 'string', default: "''", description: 'Alt text.' },
            { name: 'initials', type: 'string', default: "''", description: 'Fallback initials.' },
            { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar size.' },
        ],
        example: `<Avatar src="user.jpg" initials="JD" />`,
        previewProps: {
            initials: 'UI',
            size: 'lg'
        }
    },
    {
        name: 'Accordion',
        category: 'Data Display',
        description: 'A collapsible content list.',
        props: [
            { name: 'items', type: '{ id: string, title: string, content: string }[]', default: '[]', description: 'Accordion items.' },
        ],
        example: `<Accordion items={items} />`,
        previewProps: {
            items: [
                { id: '1', title: 'Section 1', content: 'Content for section 1.' },
                { id: '2', title: 'Section 2', content: 'Content for section 2.' }
            ]
        }
    },
    {
        name: 'Table',
        category: 'Data Display',
        description: 'A data table.',
        props: [
            { name: 'headers', type: 'string[]', default: '[]', description: 'Column headers.' },
            { name: 'rows', type: 'string[][]', default: '[]', description: 'Table data rows.' },
            { name: 'caption', type: 'string', default: "''", description: 'Table caption.' },
        ],
        example: `<Table headers={['Name', 'Role']} rows={[['John', 'Admin']]} />`,
        previewProps: {
            headers: ['ID', 'Name', 'Role'],
            rows: [
                ['1', 'Alice', 'Admin'],
                ['2', 'Bob', 'User'],
                ['3', 'Charlie', 'Guest']
            ],
            caption: 'Users List'
        }
    },
    {
        name: 'Skeleton',
        category: 'Feedback',
        description: 'A loading placeholder.',
        props: [
            { name: 'width', type: 'string', default: "'100%'", description: 'Width of the skeleton.' },
            { name: 'height', type: 'string', default: "'1rem'", description: 'Height of the skeleton.' },
            { name: 'circle', type: 'boolean', default: 'false', description: 'Whether to render as a circle.' },
        ],
        example: `<Skeleton width="200px" />`,
        previewProps: {
            width: '100%',
            height: '2rem'
        }
    },
    {
        name: 'RadioGroup',
        category: 'Inputs',
        description: 'A set of radio buttons.',
        props: [
            { name: 'value', type: 'string', default: "''", description: 'Selected value.' },
            { name: 'options', type: '{ value: string, label: string, description?: string }[]', default: '[]', description: 'Radio options.' },
            { name: 'label', type: 'string', default: "''", description: 'Group label.' },
        ],
        example: `<RadioGroup options={options} bind:value={selected} />`,
        previewProps: {
            label: 'Choose Plan',
            options: [
                { value: 'free', label: 'Free', description: 'Basic features' },
                { value: 'pro', label: 'Pro', description: 'Advanced features' }
            ]
        }
    },
    {
        name: 'Divider',
        category: 'Layout',
        description: 'A visual separator.',
        props: [
            { name: 'text', type: 'string', default: "''", description: 'Optional text in the middle.' },
        ],
        example: `<Divider text="OR" />`,
        previewProps: {
            text: 'Section Break'
        }
    },
    {
        name: 'DropdownMenu',
        category: 'Interactive',
        description: 'A toggleable menu.',
        props: [
            { name: 'items', type: 'DropdownItem[]', default: '[]', description: 'Menu items.' },
            { name: 'position', type: "'bottom-left' | 'bottom-right' | ...", default: "'bottom-right'", description: 'Menu position.' },
        ],
        slots: [{ name: 'trigger', description: 'The element to toggle the menu.' }],
        example: `<DropdownMenu items={items}><Button>Menu</Button></DropdownMenu>`,
        previewProps: {
            items: [
                { label: 'Profile', onClick: () => { } },
                { label: 'Settings', onClick: () => { } },
                { label: 'Logout', onClick: () => { }, variant: 'danger' }
            ],
            // Trigger slot needs handling
        }
    },
    {
        name: 'Popover',
        category: 'Interactive',
        description: 'A floating content container.',
        props: [
            { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Popover position.' },
        ],
        slots: [
            { name: 'trigger', description: 'The element to toggle the popover.' },
            { name: 'default', description: 'Popover content.' },
        ],
        example: `<Popover><Button>Open</Button><div>Content</div></Popover>`,
        previewProps: {
            // Slots handling needed
        }
    },
    {
        name: 'CommandPalette',
        category: 'Interactive',
        description: 'A global command menu.',
        props: [
            { name: 'open', type: 'boolean', default: 'false', description: 'Whether the palette is open.' },
            { name: 'groups', type: 'CommandGroup[]', default: '[]', description: 'Command groups and items.' },
        ],
        example: `<CommandPalette bind:open={isOpen} groups={commands} />`,
        previewProps: {
            open: false,
            groups: [
                {
                    heading: 'Actions',
                    items: [
                        { id: '1', label: 'New File', onSelect: () => { } },
                        { id: '2', label: 'Copy Link', onSelect: () => { } }
                    ]
                }
            ]
        }
    },
    {
        name: 'Pagination',
        category: 'Navigation',
        description: 'Page navigation controls.',
        props: [
            { name: 'page', type: 'number', default: '1', description: 'Current page.' },
            { name: 'totalPages', type: 'number', default: '1', description: 'Total number of pages.' },
        ],
        example: `<Pagination bind:page={currentPage} totalPages={10} />`,
        previewProps: {
            page: 1,
            totalPages: 10
        }
    },
    {
        name: 'Stepper',
        category: 'Navigation',
        description: 'A step progress indicator.',
        props: [
            { name: 'steps', type: 'Step[]', default: '[]', description: 'Steps definition.' },
            { name: 'currentStep', type: 'number', default: '0', description: 'Current step index.' },
        ],
        example: `<Stepper steps={steps} currentStep={current} />`,
        previewProps: {
            steps: [
                { label: 'Step 1', description: 'Details' },
                { label: 'Step 2', description: 'Payment' },
                { label: 'Step 3', description: 'Confirm' }
            ],
            currentStep: 1
        }
    },
    {
        name: 'PinInput',
        category: 'Inputs',
        description: 'An OTP/PIN input field.',
        props: [
            { name: 'value', type: 'string', default: "''", description: 'The entered PIN.' },
            { name: 'length', type: 'number', default: '4', description: 'Number of digits.' },
            { name: 'mask', type: 'boolean', default: 'false', description: 'Mask input like password.' },
        ],
        example: `<PinInput length={6} bind:value={pin} />`,
        previewProps: {
            length: 4
        }
    },
    {
        name: 'Combobox',
        category: 'Inputs',
        description: 'A searchable select component.',
        props: [
            { name: 'value', type: 'string', default: "''", description: 'Selected value.' },
            { name: 'options', type: 'Option[]', default: '[]', description: 'Available options.' },
            { name: 'label', type: 'string', default: "''", description: 'Label text.' },
        ],
        example: `<Combobox options={countries} bind:value={selectedCountry} />`,
        previewProps: {
            label: 'Select Framework',
            options: [
                { value: 'svelte', label: 'Svelte' },
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' }
            ]
        }
    },
    {
        name: 'Rating',
        category: 'Inputs',
        description: 'A star rating input.',
        props: [
            { name: 'value', type: 'number', default: '0', description: 'Current rating.' },
            { name: 'max', type: 'number', default: '5', description: 'Maximum rating.' },
            { name: 'readonly', type: 'boolean', default: 'false', description: 'Read-only mode.' },
        ],
        example: `<Rating bind:value={rating} />`,
        previewProps: {
            value: 3
        }
    },
    {
        name: 'Timeline',
        category: 'Data Display',
        description: 'A vertical timeline.',
        props: [
            { name: 'items', type: 'TimelineItem[]', default: '[]', description: 'Timeline events.' },
        ],
        example: `<Timeline items={events} />`,
        previewProps: {
            items: [
                { title: 'Event 1', date: '2023-01-01', description: 'Started project' },
                { title: 'Event 2', date: '2023-02-01', description: 'Launched beta' }
            ]
        }
    },
    {
        name: 'ResizableSplitter',
        category: 'Layout',
        description: 'A resizable split container.',
        props: [
            { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Split direction.' },
            { name: 'initialSplit', type: 'number', default: '50', description: 'Initial split percentage.' },
        ],
        slots: [
            { name: 'first', description: 'First pane content (snippet).' },
            { name: 'second', description: 'Second pane content (snippet).' },
        ],
        example: `<ResizableSplitter>
  {#snippet first()}Left{/snippet}
  {#snippet second()}Right{/snippet}
</ResizableSplitter>`,
        previewProps: {
            class: 'h-64 border rounded'
            // Snippets need special handling in preview
        }
    },
    {
        name: 'TreeView',
        category: 'Expert',
        description: 'A hierarchical list component with collapsible nodes.',
        props: [
            { name: 'nodes', type: 'TreeNode[]', default: '[]', description: 'The hierarchical data to display.' },
            { name: 'selectedId', type: 'string', default: "''", description: 'The ID of the currently selected node.' },
        ],
        example: `<TreeView nodes={treeNodes} bind:selectedId={selectedId} />`,
        previewProps: {
            nodes: [
                {
                    id: '1',
                    label: 'Root',
                    children: [
                        { id: '1-1', label: 'Child 1' },
                        { id: '1-2', label: 'Child 2', children: [{ id: '1-2-1', label: 'Grandchild' }] }
                    ]
                }
            ]
        }
    },
];

export const categories = [...new Set(components.map(c => c.category))];

export function getComponent(name: string) {
    return components.find(c => c.name === name);
}
