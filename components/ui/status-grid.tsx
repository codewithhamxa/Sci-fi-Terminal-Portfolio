import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function StatusGrid({ className, rows = 4, cols = 8 }: { className?: string, rows?: number, cols?: number }) {
  const totalCells = rows * cols;
  const [cellStates, setCellStates] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate random states only on the client
    const generateStates = () => Array.from({ length: totalCells }).map(() => Math.random());
    
    // Initial state setup after mount
    const timeout = setTimeout(() => {
      setCellStates(generateStates());
    }, 0);
    
    // Periodically update some cells to make it feel alive
    const interval = setInterval(() => {
      setCellStates(generateStates());
    }, 3000);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [totalCells]);
  
  return (
    <div 
      className={cn("grid gap-1", className)} 
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: totalCells }).map((_, i) => {
        // Use deterministic pseudo-random for initial render to avoid hydration mismatch
        const rand = cellStates.length > 0 ? cellStates[i] : Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
        
        let statusClass = "bg-primary/20"; // default off/idle
        if (rand > 0.9) statusClass = "bg-red-500 animate-pulse"; // error
        else if (rand > 0.7) statusClass = "bg-primary animate-pulse glow-box"; // active
        else if (rand > 0.4) statusClass = "bg-primary/60"; // standby
        
        return (
          <div 
            key={i} 
            className={cn("w-full aspect-square rounded-sm transition-colors duration-1000", statusClass)}
          />
        );
      })}
    </div>
  );
}
