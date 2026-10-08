export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-1/4 top-0 h-[70vh] w-[70vw] rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute -right-1/4 top-1/3 h-[60vh] w-[60vw] rounded-full bg-fuchsia-700/15 blur-[100px]" />
      <div className="absolute bottom-0 left-1/3 h-[40vh] w-[50vw] rounded-full bg-rose-900/20 blur-[90px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0c0a12_0%,_#050508_55%,_#000_100%)]" />
    </div>
  );
}
