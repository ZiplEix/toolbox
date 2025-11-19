<script lang="ts">
  import { type Snippet } from "svelte";

  type Variant =
    | "neutral"
    | "primary"
    | "success"
    | "warning"
    | "error"
    | "outline";

  let {
    children,
    variant = "neutral",
    class: className = "",
    ...rest
  }: {
    children: Snippet;
    variant?: Variant;
    class?: string;
    [key: string]: any;
  } = $props();

  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    neutral: "bg-gray-100 text-gray-800 border border-gray-200",
    primary: "bg-primary-100 text-primary-800 border border-primary-200",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    error: "bg-red-100 text-red-800 border border-red-200",
    outline: "bg-transparent text-gray-800 border border-gray-300",
  };

  const classes = $derived(`${baseStyles} ${variants[variant]} ${className}`);
</script>

<span class={classes} {...rest}>
  {@render children()}
</span>
