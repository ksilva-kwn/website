// Fixed mesh gradient + drifting light blobs that the glass surfaces blur over
const GlassBackground = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-mesh" />
    <div className="absolute -top-40 -left-32 w-[38rem] h-[38rem] rounded-full bg-tech-blue/50 blur-[120px] animate-drift" />
    <div
      className="absolute top-1/4 -right-40 w-[34rem] h-[34rem] rounded-full bg-tech-lilac/40 blur-[120px] animate-drift"
      style={{ animationDelay: "-8s" }}
    />
    <div
      className="absolute -bottom-40 left-1/3 w-[36rem] h-[36rem] rounded-full bg-tech-purple/35 blur-[120px] animate-drift"
      style={{ animationDelay: "-16s" }}
    />
  </div>
);

export default GlassBackground;
