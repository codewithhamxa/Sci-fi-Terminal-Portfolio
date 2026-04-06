import * as React from "react"
import { cn } from "@/lib/utils"

const Terminal = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border border-primary bg-background text-foreground notch-br relative overflow-hidden flex flex-col",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-primary/30 bg-primary/10 text-xs uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          <span>TERMINAL // BASH</span>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 border border-primary/50"></div>
          <div className="w-3 h-3 border border-primary/50"></div>
          <div className="w-3 h-3 bg-primary/50"></div>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto font-mono text-sm leading-relaxed">
        {children}
      </div>
    </div>
  )
)
Terminal.displayName = "Terminal"

export { Terminal }
