export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="relative flex flex-col items-center">
        {/* Glow */}
        <div className="absolute h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />

        {/* Spinner */}
        <div className="relative">
          <div className="h-20 w-20 rounded-full border border-white/10" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-violet-500 border-r-fuchsia-500" />

          <div className="absolute inset-3 rounded-full bg-zinc-950" />
        </div>

        {/* Text */}
        <div className="mt-6 flex items-center gap-1 text-sm font-medium tracking-widest text-zinc-400">
          <span className="animate-pulse">LOADING</span>

          <div className="flex gap-1">
            <span className="animate-bounce [animation-delay:-0.3s]">.</span>
            <span className="animate-bounce [animation-delay:-0.15s]">.</span>
            <span className="animate-bounce">.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
