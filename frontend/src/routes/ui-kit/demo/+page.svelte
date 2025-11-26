<script lang="ts">
  import {
    Button,
    Badge,
    Input,
    Card,
    Modal,
    PasswordInput,
    DatePicker,
    Switch,
    Checkbox,
    Textarea,
    Select,
    Tooltip,
    Toast,
    toast,
    Progress,
    CircularProgress,
    Slider,
    FileInput,
    Alert,
    CodeMockup,
    Countdown,
    Tabs,
    Breadcrumb,
    Drawer,
    Avatar,
    Accordion,
    Table,
    Skeleton,
    RadioGroup,
    Divider,
    DropdownMenu,
    Popover,
    CommandPalette,
    Pagination,
    Stepper,
    PinInput,
    Combobox,
    Rating,
    Timeline,
    TreeView,
    ResizableSplitter,
  } from "$lib/ui";

  let showModal = $state(false);
  let showDrawer = $state(false);
  let showCommandPalette = $state(false);
  let inputValue = $state("");
  let passwordValue = $state("");
  let dateValue = $state("");
  let switchValue = $state(false);
  let checkboxValue = $state(false);
  let textareaValue = $state("");
  let selectValue = $state("");
  let sliderValue = $state(50);
  let files: FileList | undefined = $state(undefined);
  let activeTab = $state("tab1");
  let radioValue = $state("option1");
  let currentPage = $state(1);
  let currentStep = $state(1);
  let pinValue = $state("");
  let comboboxValue = $state("");
  let ratingValue = $state(3);
  let treeSelection = $state("");

  const selectOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  const comboboxOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
  ];

  const tabItems = [
    { value: "tab1", label: "Account" },
    { value: "tab2", label: "Password" },
    { value: "tab3", label: "Settings" },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Demo" },
  ];

  const accordionItems = [
    {
      id: "1",
      title: "What is Svelte?",
      content: "Svelte is a radical new approach to building user interfaces.",
    },
    {
      id: "2",
      title: "Why use Tailwind?",
      content:
        "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.",
    },
  ];

  const tableHeaders = ["Name", "Role", "Status"];
  const tableRows = [
    ["John Doe", "Developer", "Active"],
    ["Jane Smith", "Designer", "Inactive"],
    ["Bob Johnson", "Manager", "Active"],
  ];

  const radioOptions = [
    {
      value: "option1",
      label: "Default",
      description: "This is the default option",
    },
    {
      value: "option2",
      label: "Comfortable",
      description: "A more comfortable layout",
    },
    {
      value: "option3",
      label: "Compact",
      description: "Compact view for power users",
    },
  ];

  const dropdownItems = [
    { label: "Profile", onClick: () => console.log("Profile clicked") },
    { label: "Settings", onClick: () => console.log("Settings clicked") },
    {
      label: "Logout",
      danger: true,
      onClick: () => console.log("Logout clicked"),
    },
  ];

  const commandGroups = [
    {
      heading: "Suggestions",
      items: [
        {
          id: "calendar",
          label: "Calendar",
          action: () => console.log("Calendar"),
        },
        {
          id: "emoji",
          label: "Search Emoji",
          action: () => console.log("Emoji"),
        },
      ],
    },
    {
      heading: "Settings",
      items: [
        {
          id: "profile",
          label: "Profile",
          shortcut: "⌘P",
          action: () => console.log("Profile"),
        },
        {
          id: "billing",
          label: "Billing",
          shortcut: "⌘B",
          action: () => console.log("Billing"),
        },
        {
          id: "settings",
          label: "Settings",
          shortcut: "⌘S",
          action: () => console.log("Settings"),
        },
      ],
    },
  ];

  const steps = [
    { label: "Personal Info", description: "Enter your details" },
    { label: "Account", description: "Create your account" },
    { label: "Confirmation", description: "Review and submit" },
  ];

  const timelineItems = [
    {
      date: "Just now",
      title: "Project created",
      description: 'You created the project "Purple UI".',
    },
    {
      date: "2 hours ago",
      title: "Component added",
      description: "Added Timeline component.",
    },
    {
      date: "Yesterday",
      title: "Initial commit",
      description: "Project initialized.",
    },
  ];

  const treeNodes = [
    {
      id: "src",
      label: "src",
      children: [
        {
          id: "lib",
          label: "lib",
          children: [
            { id: "ui", label: "ui" },
            { id: "utils", label: "utils" },
          ],
        },
        { id: "routes", label: "routes" },
      ],
    },
    { id: "package.json", label: "package.json" },
  ];

  function showToast(type: "info" | "success" | "warning" | "error") {
    toast.add(`This is a ${type} toast message`, type);
  }
</script>

<Toast />
<CommandPalette bind:open={showCommandPalette} groups={commandGroups} />

<Toast />
<CommandPalette bind:open={showCommandPalette} groups={commandGroups} />

<div class="space-y-12">
  <header class="space-y-2 border-b pb-6">
    <h1 class="text-3xl font-bold text-gray-900">Component Demo</h1>
    <p class="text-lg text-gray-600">
      A showcase of all available components in the UI kit.
    </p>
  </header>

  <!-- Expert Components -->
  <section class="space-y-8">
    <h2 class="text-2xl font-semibold">Expert Components</h2>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Combobox</h3>
        <Combobox
          label="Select Country"
          options={comboboxOptions}
          bind:value={comboboxValue}
        />
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">Rating</h3>
        <Rating bind:value={ratingValue} />
        <p class="text-sm text-gray-500">Rating: {ratingValue}/5</p>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">Timeline</h3>
        <Timeline items={timelineItems} />
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">Tree View</h3>
        <div class="border rounded-lg p-4 bg-white">
          <TreeView nodes={treeNodes} bind:selectedId={treeSelection} />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium">Resizable Splitter</h3>
      <div class="h-64 border rounded-lg overflow-hidden">
        <ResizableSplitter>
          {#snippet first()}
            <div
              class="h-full bg-primary-50 p-4 flex items-center justify-center text-primary-700"
            >
              Left Pane
            </div>
          {/snippet}
          {#snippet second()}
            <div
              class="h-full bg-white p-4 flex items-center justify-center text-gray-500"
            >
              Right Pane
            </div>
          {/snippet}
        </ResizableSplitter>
      </div>
    </div>
  </section>

  <Divider />

  <!-- Interactive Components -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Interactive</h2>
    <div class="flex flex-wrap gap-4 items-center">
      <DropdownMenu items={dropdownItems}>
        {#snippet trigger()}
          <Button variant="outline">Open Menu</Button>
        {/snippet}
      </DropdownMenu>

      <Popover>
        {#snippet trigger()}
          <Button variant="secondary">Open Popover</Button>
        {/snippet}
        <div class="space-y-2">
          <h3 class="font-medium">Popover Content</h3>
          <p class="text-sm text-gray-500">
            This is a popover with some content inside.
          </p>
          <Input placeholder="Type something..." />
        </div>
      </Popover>

      <Button onclick={() => (showCommandPalette = true)}>
        Open Command Palette <span class="ml-2 text-xs opacity-60">⌘K</span>
      </Button>
    </div>
  </section>

  <Divider />

  <!-- Navigation & Structure -->
  <section class="space-y-8">
    <h2 class="text-2xl font-semibold">Navigation & Structure</h2>

    <div class="space-y-4">
      <h3 class="text-lg font-medium">Tabs</h3>
      <Tabs items={tabItems} bind:value={activeTab} />
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium">Stepper</h3>
      <Stepper {steps} {currentStep} />
      <div class="flex gap-2 mt-4">
        <Button
          size="sm"
          variant="outline"
          disabled={currentStep === 0}
          onclick={() => currentStep--}>Previous</Button
        >
        <Button
          size="sm"
          disabled={currentStep === steps.length - 1}
          onclick={() => currentStep++}>Next</Button
        >
      </div>
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium">Pagination</h3>
      <Pagination totalPages={10} bind:page={currentPage} />
    </div>

    <div class="space-y-4">
      <h3 class="text-lg font-medium">Drawer</h3>
      <Button onclick={() => (showDrawer = true)}>Open Drawer</Button>
      <Drawer bind:open={showDrawer} title="Settings Drawer">
        <p>This is the drawer content.</p>
        {#snippet footer()}
          <Button class="w-full" onclick={() => (showDrawer = false)}
            >Close</Button
          >
        {/snippet}
      </Drawer>
    </div>
  </section>

  <Divider />

  <!-- Data Display -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Data Display</h2>
    <div class="grid md:grid-cols-2 gap-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Avatars</h3>
        <div class="flex items-center gap-4">
          <Avatar src="https://i.pravatar.cc/150?u=1" alt="User 1" />
          <Avatar
            initials="JD"
            alt="John Doe"
            class="bg-primary-100 text-primary-700"
          />
          <Avatar size="lg" src="https://i.pravatar.cc/150?u=2" alt="User 2" />
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-medium">Skeleton</h3>
        <div class="space-y-2">
          <div class="flex items-center gap-4">
            <Skeleton circle width="3rem" height="3rem" />
            <div class="space-y-2 flex-1">
              <Skeleton width="100%" />
              <Skeleton width="60%" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-2 space-y-4">
        <h3 class="text-lg font-medium">Accordion</h3>
        <Accordion items={accordionItems} />
      </div>

      <div class="col-span-2 space-y-4">
        <h3 class="text-lg font-medium">Table</h3>
        <Table headers={tableHeaders} rows={tableRows} caption="Team Members" />
      </div>
    </div>
  </section>

  <Divider />

  <!-- Buttons & Tooltips -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Buttons & Tooltips</h2>
    <div class="flex flex-wrap gap-4 items-center">
      <Tooltip content="Primary Action">
        <Button variant="primary">Hover me</Button>
      </Tooltip>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  </section>

  <!-- Toasts -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Toasts</h2>
    <div class="flex flex-wrap gap-4">
      <Button onclick={() => showToast("info")}>Info Toast</Button>
      <Button
        onclick={() => showToast("success")}
        class="bg-green-600 hover:bg-green-700">Success Toast</Button
      >
      <Button
        onclick={() => showToast("warning")}
        class="bg-yellow-500 hover:bg-yellow-600">Warning Toast</Button
      >
      <Button
        onclick={() => showToast("error")}
        class="bg-red-600 hover:bg-red-700">Error Toast</Button
      >
    </div>
  </section>

  <!-- Progress & Loading -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Progress & Loading</h2>
    <div class="space-y-4 max-w-md">
      <Progress value={45} />
      <div class="flex items-center gap-8">
        <CircularProgress value={75} />
        <CircularProgress />
        <!-- Indeterminate -->
      </div>
    </div>
  </section>

  <!-- Sliders & File Input -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Sliders & File Input</h2>
    <div class="space-y-6 max-w-md">
      <Slider bind:value={sliderValue} />
      <p class="text-sm text-gray-500">Value: {Math.round(sliderValue)}</p>

      <FileInput bind:files />
    </div>
  </section>

  <!-- Display Components -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Display Components</h2>
    <div class="space-y-4">
      <Alert variant="info" title="Information">
        This is an info alert with a title.
      </Alert>
      <Alert variant="warning">This is a warning alert without a title.</Alert>

      <CodeMockup>npm install @sveltejs/kit</CodeMockup>

      <div class="mt-4">
        <h3 class="text-lg font-medium mb-2">Countdown</h3>
        <Countdown
          targetDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
        />
      </div>
    </div>
  </section>

  <!-- Form Elements -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Form Elements</h2>
    <div class="grid md:grid-cols-2 gap-6 max-w-2xl">
      <Input
        label="Text Input"
        placeholder="hello@example.com"
        bind:value={inputValue}
      />

      <PasswordInput
        label="Password"
        placeholder="Enter password"
        bind:value={passwordValue}
      />

      <div class="col-span-2">
        <h3 class="text-sm font-medium mb-2">Pin Input (OTP)</h3>
        <PinInput
          length={4}
          bind:value={pinValue}
          oncomplete={(v) => toast.add(`Pin entered: ${v}`, "success")}
        />
      </div>

      <DatePicker label="Date Picker" bind:value={dateValue} />

      <Select
        label="Select Option"
        options={selectOptions}
        bind:value={selectValue}
      />

      <div class="col-span-2">
        <RadioGroup
          label="View Density"
          options={radioOptions}
          bind:value={radioValue}
        />
      </div>

      <div class="col-span-2">
        <Textarea
          label="Textarea"
          placeholder="Type your message here..."
          bind:value={textareaValue}
        />
      </div>

      <div class="flex items-center gap-8">
        <Switch label="Toggle Switch" bind:checked={switchValue} />
        <Checkbox label="Checkbox" bind:checked={checkboxValue} />
      </div>
    </div>
  </section>

  <!-- Cards & Modals -->
  <section class="space-y-4">
    <h2 class="text-2xl font-semibold">Cards & Modals</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <Card>
        {#snippet header()}
          <h3 class="text-lg font-semibold">Simple Card</h3>
        {/snippet}
        <p>This is the main content of the card.</p>
        {#snippet footer()}
          <Button variant="outline" size="sm" onclick={() => (showModal = true)}
            >Open Modal</Button
          >
        {/snippet}
      </Card>
    </div>

    <Modal bind:open={showModal} title="Example Modal">
      <p>This is a modal dialog.</p>
      {#snippet footer()}
        <Button variant="ghost" onclick={() => (showModal = false)}
          >Cancel</Button
        >
        <Button onclick={() => (showModal = false)}>Confirm</Button>
      {/snippet}
    </Modal>
  </section>
</div>
