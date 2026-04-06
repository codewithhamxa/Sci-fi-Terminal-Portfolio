import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function StatusGrid({ className, rows = 4, cols = 8 }: { className?: string, rows?: number, cols?: number }) {
  const totalCells = rows * cols;
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div 
      className={cn("grid gap-1", className)} 
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: totalCells }).map((_, i) => {
        // Use a deterministic pseudo-random value for initial render to avoid hydration mismatch
        // Then use actual random if mounted to make it look organic
        const rand = mounted ? Math.random() : (Math.sin(i * 12.9898) * 43758.5453) % 1;
        const absRand = Math.abs(rand);
        
        let statusClass = "bg-primary/20"; // default off/idle
        if (absRand > 0.9) statusClass = "bg-red-500 animate-pulse"; // error
        else if (absRand > 0.7) statusClass = "bg-primary animate-pulse glow-box"; // active
        else if (absRand > 0.4) statusClass = "bg-primary/60"; // standby
        
        return (
          <div 
            key={i} 
            className={cn("w-full aspect-square rounded-sm", statusClass)}
          />
        );
      })}
    </div>
  );
}
