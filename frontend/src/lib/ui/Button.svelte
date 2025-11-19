<script lang="ts">
  import { type Snippet } from 'svelte';

  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  type Size = 'sm' | 'md' | 'lg';

  let {
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    href = undefined,
    type = 'button',
    class: className = '',
    onclick,
    ...rest
  }: {
    children: Snippet;
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    class?: string;
    onclick?: (event: MouseEvent) => void;
    [key: string]: any;
  } = $props();

  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-700 shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-600 shadow-sm",
    outline: "border border-input bg-background hover:bg-surface hover:text-primary-700",
    ghost: "hover:bg-surface hover:text-primary-700",
    link: "text-primary underline-offset-4 hover:underline"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base"
  };

  const classes = $derived(`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`);
</script>

{#if href}
  <a {href} class={classes} {...rest}>
    {@render children()}
  </a>
{:else}
  <button {type} class={classes} {disabled} {onclick} {...rest}>
    {@render children()}
  </button>
{/if}
