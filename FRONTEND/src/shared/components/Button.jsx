export function SharedButton({
  children,
  icon,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) {
  const variants = {
    primary: `
      bg-zinc-900 text-white
      hover:bg-zinc-800
    `,
    secondary: `
      bg-zinc-100 text-zinc-900
      hover:bg-zinc-200
    `,
    success: `
      bg-emerald-600 text-white
      hover:bg-emerald-700
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
    `,
    outline: `
      border border-zinc-300
      bg-white text-zinc-900
      hover:bg-zinc-50
    `,
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        font-semibold
        shadow-sm
        transition-all duration-300
        hover:scale-105
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? <span className="animate-spin">⏳</span> : icon}

      {children}
    </button>
  );
}
