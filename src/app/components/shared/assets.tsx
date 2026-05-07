import React from 'react';

/**
 * DePedal bicycle logo SVG icon.
 * Usage: <DePedalLogo className="w-8 h-8" />
 */
export function DePedalLogo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DePedal logo"
    >
      {/* Rear wheel */}
      <circle cx="12" cy="34" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="12" cy="34" r="2" fill="currentColor" />
      {/* Front wheel */}
      <circle cx="36" cy="34" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="36" cy="34" r="2" fill="currentColor" />
      {/* Frame: down tube */}
      <line x1="20" y1="34" x2="28" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Frame: seat tube */}
      <line x1="20" y1="34" x2="22" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Frame: top tube */}
      <line x1="22" y1="20" x2="28" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Frame: chain stay */}
      <line x1="12" y1="34" x2="20" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Frame: seat stay */}
      <line x1="12" y1="34" x2="22" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Fork to front wheel */}
      <line x1="28" y1="18" x2="36" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Handlebar */}
      <line x1="25" y1="18" x2="32" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Seat */}
      <line x1="19" y1="19" x2="25" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Crank / pedal hub */}
      <circle cx="20" cy="34" r="3" stroke="currentColor" strokeWidth="2" fill="white" />
      {/* Pedal arm */}
      <line x1="17" y1="36" x2="23" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * DePedal logo with text (horizontal lockup).
 * Usage: <DePedalWordmark className="h-8" />
 */
export function DePedalWordmark({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-700 text-white">
        <DePedalLogo className="w-5 h-5" />
      </div>
      <span className="text-xl font-bold text-gray-900 tracking-tight">DePedal</span>
    </div>
  );
}

/**
 * DePedal admin logo with text.
 */
export function DePedalAdminWordmark({ className = 'h-8' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-600 text-white">
        <DePedalLogo className="w-5 h-5" />
      </div>
      <span className="text-xl font-bold text-white tracking-tight">DePedal</span>
    </div>
  );
}

/**
 * Sample GCash QR code SVG — for mockup/prototype display only.
 * Represents a QR code pattern typical of GCash payment pages.
 */
export function GCashQRCode({ amount }: { amount?: number }) {
  // A representative QR code pattern (not scannable — purely for mockup)
  const cells: [number, number][] = [
    // Top-left finder
    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
    [0,1],[6,1],
    [0,2],[2,2],[3,2],[4,2],[6,2],
    [0,3],[2,3],[4,3],[6,3],
    [0,4],[2,4],[3,4],[4,4],[6,4],
    [0,5],[6,5],
    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],
    // Top-right finder
    [14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],
    [14,1],[20,1],
    [14,2],[16,2],[17,2],[18,2],[20,2],
    [14,3],[16,3],[18,3],[20,3],
    [14,4],[16,4],[17,4],[18,4],[20,4],
    [14,5],[20,5],
    [14,6],[15,6],[16,6],[17,6],[18,6],[19,6],[20,6],
    // Bottom-left finder
    [0,14],[1,14],[2,14],[3,14],[4,14],[5,14],[6,14],
    [0,15],[6,15],
    [0,16],[2,16],[3,16],[4,16],[6,16],
    [0,17],[2,17],[4,17],[6,17],
    [0,18],[2,18],[3,18],[4,18],[6,18],
    [0,19],[6,19],
    [0,20],[1,20],[2,20],[3,20],[4,20],[5,20],[6,20],
    // Data modules (pseudo-random pattern)
    [8,0],[9,0],[11,0],[12,0],[13,0],
    [8,2],[10,2],[12,2],
    [9,3],[11,3],[13,3],
    [8,4],[10,4],[12,4],[13,4],
    [9,5],[11,5],
    [8,6],[9,6],[11,6],[12,6],
    [8,8],[9,8],[10,8],[12,8],[14,8],[16,8],[18,8],[19,8],[20,8],
    [8,9],[11,9],[13,9],[15,9],[17,9],[19,9],
    [8,10],[10,10],[12,10],[14,10],[16,10],[18,10],[20,10],
    [9,11],[11,11],[13,11],[15,11],[17,11],[19,11],
    [8,12],[10,12],[12,12],[16,12],[18,12],[20,12],
    [9,13],[11,13],[15,13],[17,13],[19,13],
    [8,14],[10,14],[12,14],[14,14],[16,14],[18,14],[20,14],
    [8,15],[9,15],[13,15],[15,15],[19,15],[20,15],
    [8,16],[10,16],[12,16],[14,16],[16,16],[18,16],[20,16],
    [9,17],[11,17],[13,17],[15,17],[17,17],[19,17],
    [8,18],[10,18],[14,18],[16,18],[18,18],[20,18],
    [9,19],[11,19],[13,19],[15,19],[17,19],
    [8,20],[10,20],[12,20],[14,20],[16,20],[18,20],[20,20],
  ];

  const cellSize = 8;
  const size = 21 * cellSize;
  const padding = 16;
  const totalSize = size + padding * 2;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* GCash branding bar */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-t-xl bg-[#0072C6] text-white text-sm font-bold w-full justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
        </svg>
        GCash Payment
      </div>

      <div className="bg-white border border-gray-200 rounded-b-xl p-4 flex flex-col items-center gap-3 w-full">
        {amount && (
          <p className="text-2xl font-bold text-gray-900">₱{amount.toFixed(2)}</p>
        )}
        <svg
          width={totalSize}
          height={totalSize}
          viewBox={`0 0 ${totalSize} ${totalSize}`}
          xmlns="http://www.w3.org/2000/svg"
          aria-label="GCash QR Code (Mockup)"
        >
          <rect width={totalSize} height={totalSize} fill="white" />
          {cells.map(([col, row]) => (
            <rect
              key={`${col}-${row}`}
              x={padding + col * cellSize}
              y={padding + row * cellSize}
              width={cellSize - 1}
              height={cellSize - 1}
              fill="#1a1a1a"
              rx="1"
            />
          ))}
        </svg>
        <p className="text-[11px] text-gray-400 text-center">
          Scan this QR code in your GCash app to pay
        </p>
        <p className="text-[10px] text-orange-500 font-medium">
          ⚠ Prototype mockup — not a real QR code
        </p>
      </div>
    </div>
  );
}
