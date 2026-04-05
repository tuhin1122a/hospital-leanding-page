export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative w-20 h-20">
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full border-4 border-[#2E68FF] opacity-20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full border-4 border-[#2E68FF] opacity-40 animate-ping [animation-delay:0.2s]"></div>
        {/* Medical Cross Logo in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
            <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2E68FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
                >
                <path d="M12 5v14M5 12h14" />
            </svg>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-lg font-semibold text-slate-800 animate-pulse">Nurjahan Hospital</h3>
        <p className="text-sm text-slate-500">Preparing world-class care...</p>
      </div>
    </div>
  );
}
