import React from 'react';
import { cn } from '@/lib/utils';

export function Radar({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-32 h-32 rounded-full border border-primary/50 overflow-hidden flex items-center justify-center", className)}>
      {/* Concentric circles */}
      <div className="absolute w-24 h-24 rounded-full border border-primary/30"></div>
      <div className="absolute w-16 h-16 rounded-full border border-primary/30"></div>
      <div className="absolute w-8 h-8 rounded-full border border-primary/30"></div>
      
      {/* Crosshairs */}
      <div className="absolute w-full h-[1px] bg-primary/30"></div>
      <div className="absolute h-full w-[1px] bg-primary/30"></div>
      
      {/* Scanning beam */}
      <div className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left bg-gradient-to-br from-primary/40 to-transparent animate-[spin_4s_linear_infinite]"></div>
      
      {/* Blips */}
      <div className="absolute w-1.5 h-1.5 bg-primary rounded-full top-8 right-10 animate-pulse glow-box"></div>
      <div className="absolute w-1 h-1 bg-primary rounded-full bottom-10 left-8 animate-ping"></div>
    </div>
  );
}
