# UI Kit Documentation

This documentation describes the components available in the UI Kit, including their props, events, slots, and usage examples.

## General

### Button

A versatile button component with multiple variants and sizes.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost' | 'link'` | `'primary'` | The visual style of the button. |
| `size` | `'sm' | 'md' | 'lg' | 'icon'` | `'md'` | The size of the button. |
| `disabled` | `boolean` | `false` | Whether the button is disabled. |
| `href` | `string` | `undefined` | If provided, renders as an anchor tag. |
| `type` | `'button' | 'submit' | 'reset'` | `'button'` | The HTML button type. |

**Events**

- `click`: Fired when the button is clicked.

**Slots**

- `default`: The content of the button.

**Example**

```svelte
<Button variant="primary">Click me</Button>
<Button variant="outline">Cancel</Button>
```

---

## Inputs

### Input

A standard text input field.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | The current value of the input. |
| `label` | `string` | `''` | Label text displayed above the input. |
| `placeholder` | `string` | `''` | Placeholder text. |
| `error` | `string` | `''` | Error message to display. |
| `disabled` | `boolean` | `false` | Whether the input is disabled. |

**Events**

- `input`: Fired when the value changes.
- `change`: Fired when the input loses focus or value changes.

**Example**

```svelte
<Input label="Email" placeholder="hello@example.com" bind:value={email} />
```

---

### PasswordInput

An input field for passwords with visibility toggle.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | The password value. |
| `label` | `string` | `''` | Label text. |

**Example**

```svelte
<PasswordInput label="Password" bind:value={password} />
```

---

### DatePicker

A date selection input.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | The selected date (YYYY-MM-DD). |
| `label` | `string` | `''` | Label text. |

**Example**

```svelte
<DatePicker label="Birth Date" bind:value={date} />
```

---

### Switch

A toggle switch for boolean values.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Whether the switch is on. |
| `label` | `string` | `''` | Label text. |

**Example**

```svelte
<Switch label="Notifications" bind:checked={enabled} />
```

---

### Checkbox

A checkbox for boolean values.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Whether the checkbox is checked. |
| `label` | `string` | `''` | Label text. |

**Example**

```svelte
<Checkbox label="I agree" bind:checked={agreed} />
```

---

### Textarea

A multi-line text input.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | The text value. |
| `label` | `string` | `''` | Label text. |

**Example**

```svelte
<Textarea label="Message" bind:value={message} />
```

---

### Select

A dropdown selection component.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | The selected value. |
| `options` | `{ value: string, label: string }[]` | `[]` | List of options. |
| `label` | `string` | `''` | Label text. |

**Example**

```svelte
<Select label="Country" options={countries} bind:value={country} />
```

---

### Slider

A range slider input.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current value. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |

**Example**

```svelte
<Slider bind:value={volume} />
```

---

### FileInput

A file upload input.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `files` | `FileList` | `undefined` | Selected files. |
| `accept` | `string` | `''` | Accepted file types. |
| `multiple` | `boolean` | `false` | Allow multiple files. |

**Example**

```svelte
<FileInput bind:files={files} />
```

---

### RadioGroup

A set of radio buttons.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Selected value. |
| `options` | `{ value: string, label: string, description?: string }[]` | `[]` | Radio options. |
| `label` | `string` | `''` | Group label. |

**Example**

```svelte
<RadioGroup options={options} bind:value={selected} />
```

---

### PinInput

An OTP/PIN input field.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | The entered PIN. |
| `length` | `number` | `4` | Number of digits. |
| `mask` | `boolean` | `false` | Mask input like password. |

**Example**

```svelte
<PinInput length={6} bind:value={pin} />
```

---

### Combobox

A searchable select component.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Selected value. |
| `options` | `Option[]` | `[]` | Available options. |
| `label` | `string` | `''` | Label text. |

**Example**

```svelte
<Combobox options={countries} bind:value={selectedCountry} />
```

---

### Rating

A star rating input.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Current rating. |
| `max` | `number` | `5` | Maximum rating. |
| `readonly` | `boolean` | `false` | Read-only mode. |

**Example**

```svelte
<Rating bind:value={rating} />
```

---

## Data Display

### Card

A container for grouping related content.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `class` | `string` | `''` | Additional CSS classes. |

**Slots**

- `header`: Content for the card header.
- `default`: Main content of the card.
- `footer`: Content for the card footer.

**Example**

```svelte
<Card>
  {#snippet header()}
    <h3>Card Title</h3>
  {/snippet}
  <p>Card content goes here.</p>
  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Card>
```

---

### Badge

A small status indicator.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost'` | `'primary'` | The visual style of the badge. |
| `class` | `string` | `''` | Additional CSS classes. |

**Slots**

- `default`: Badge content.

**Example**

```svelte
<Badge variant="primary">New</Badge>
```

---

### CodeMockup

A code snippet display with copy button.

**Slots**

- `default`: Code content.

**Example**

```svelte
<CodeMockup>npm install</CodeMockup>
```

---

### Countdown

A countdown timer.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `targetDate` | `Date` | `undefined` | The date to count down to. |

**Example**

```svelte
<Countdown targetDate={futureDate} />
```

---

### Avatar

A user profile image.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | `''` | Image source URL. |
| `alt` | `string` | `''` | Alt text. |
| `initials` | `string` | `''` | Fallback initials. |
| `size` | `'sm' | 'md' | 'lg' | 'xl'` | `'md'` | Avatar size. |

**Example**

```svelte
<Avatar src="user.jpg" initials="JD" />
```

---

### Accordion

A collapsible content list.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `items` | `{ id: string, title: string, content: string }[]` | `[]` | Accordion items. |

**Example**

```svelte
<Accordion items={items} />
```

---

### Table

A data table.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `headers` | `string[]` | `[]` | Column headers. |
| `rows` | `string[][]` | `[]` | Table data rows. |
| `caption` | `string` | `''` | Table caption. |

**Example**

```svelte
<Table headers={['Name', 'Role']} rows={[['John', 'Admin']]} />
```

---

### Timeline

A vertical timeline.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `items` | `TimelineItem[]` | `[]` | Timeline events. |

**Example**

```svelte
<Timeline items={events} />
```

---

## Overlay

### Modal

A dialog box that sits on top of other content.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Whether the modal is open. |
| `title` | `string` | `''` | The title of the modal. |

**Slots**

- `default`: Modal content.
- `footer`: Modal footer content.

**Example**

```svelte
<Modal bind:open={isOpen} title="Confirm">
  <p>Are you sure?</p>
</Modal>
```

---

### Drawer

A slide-out panel.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Whether the drawer is open. |
| `position` | `'left' | 'right'` | `'right'` | Drawer position. |
| `title` | `string` | `''` | Drawer title. |

**Slots**

- `default`: Drawer content.
- `footer`: Drawer footer.

**Example**

```svelte
<Drawer bind:open={isOpen}>Content</Drawer>
```

---

## Feedback

### Tooltip

A popup that displays information on hover.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | `''` | The tooltip text. |
| `position` | `'top' | 'bottom' | 'left' | 'right'` | `'top'` | Tooltip position. |

**Slots**

- `default`: The element to trigger the tooltip.

**Example**

```svelte
<Tooltip content="Edit">
  <Button>Hover me</Button>
</Tooltip>
```

---

### Toast

A notification message.

**Example**

```svelte
// In script
toast.add('Success!', 'success');

// In template
<Toast />
```

---

### Progress

A linear progress bar.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `0` | Progress value (0-100). |
| `max` | `number` | `100` | Maximum value. |

**Example**

```svelte
<Progress value={50} />
```

---

### CircularProgress

A circular progress indicator.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | `undefined` | Progress value (0-100). If undefined, indeterminate. |
| `size` | `number` | `40` | Diameter in pixels. |

**Example**

```svelte
<CircularProgress value={75} />
```

---

### Alert

A contextual alert message.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `variant` | `'info' | 'success' | 'warning' | 'error'` | `'info'` | Alert style. |
| `title` | `string` | `''` | Alert title. |

**Slots**

- `default`: Alert content.

**Example**

```svelte
<Alert variant="error" title="Error">Something went wrong.</Alert>
```

---

### Skeleton

A loading placeholder.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `width` | `string` | `'100%'` | Width of the skeleton. |
| `height` | `string` | `'1rem'` | Height of the skeleton. |
| `circle` | `boolean` | `false` | Whether to render as a circle. |

**Example**

```svelte
<Skeleton width="200px" />
```

---

## Navigation

### Tabs

A tabbed interface.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `items` | `{ value: string, label: string }[]` | `[]` | Tab items. |
| `value` | `string` | `''` | Selected tab value. |

**Example**

```svelte
<Tabs items={tabs} bind:value={activeTab} />
```

---

### Breadcrumb

A navigation hierarchy trail.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `items` | `{ label: string, href?: string }[]` | `[]` | Breadcrumb items. |

**Example**

```svelte
<Breadcrumb items={crumbs} />
```

---

### Pagination

Page navigation controls.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | `1` | Current page. |
| `totalPages` | `number` | `1` | Total number of pages. |

**Example**

```svelte
<Pagination bind:page={currentPage} totalPages={10} />
```

---

### Stepper

A step progress indicator.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `steps` | `Step[]` | `[]` | Steps definition. |
| `currentStep` | `number` | `0` | Current step index. |

**Example**

```svelte
<Stepper steps={steps} currentStep={current} />
```

---

## Layout

### Divider

A visual separator.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `''` | Optional text in the middle. |

**Example**

```svelte
<Divider text="OR" />
```

---

### ResizableSplitter

A resizable split container.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `direction` | `'horizontal' | 'vertical'` | `'horizontal'` | Split direction. |
| `initialSplit` | `number` | `50` | Initial split percentage. |

**Slots**

- `first`: First pane content (snippet).
- `second`: Second pane content (snippet).

**Example**

```svelte
<ResizableSplitter>
  {#snippet first()}Left{/snippet}
  {#snippet second()}Right{/snippet}
</ResizableSplitter>
```

---

## Interactive

### DropdownMenu

A toggleable menu.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `items` | `DropdownItem[]` | `[]` | Menu items. |
| `position` | `'bottom-left' | 'bottom-right' | ...` | `'bottom-right'` | Menu position. |

**Slots**

- `trigger`: The element to toggle the menu.

**Example**

```svelte
<DropdownMenu items={items}><Button>Menu</Button></DropdownMenu>
```

---

### Popover

A floating content container.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `position` | `'top' | 'bottom' | 'left' | 'right'` | `'bottom'` | Popover position. |

**Slots**

- `trigger`: The element to toggle the popover.
- `default`: Popover content.

**Example**

```svelte
<Popover><Button>Open</Button><div>Content</div></Popover>
```

---

### CommandPalette

A global command menu.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Whether the palette is open. |
| `groups` | `CommandGroup[]` | `[]` | Command groups and items. |

**Example**

```svelte
<CommandPalette bind:open={isOpen} groups={commands} />
```

---

## Expert

### TreeView

A hierarchical list component with collapsible nodes.

**Props**

| Name | Type | Default | Description |
|---|---|---|---|
| `nodes` | `TreeNode[]` | `[]` | The hierarchical data to display. |
| `selectedId` | `string` | `''` | The ID of the currently selected node. |

**Example**

```svelte
<TreeView nodes={treeNodes} bind:selectedId={selectedId} />
```

---

