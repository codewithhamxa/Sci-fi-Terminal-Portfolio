import * as React from "react"
import { cn } from "@/lib/utils"

const Kbd = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-sm border border-primary/30 bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-primary shadow-sm",
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = "Kbd"

export { Kbd }
