import * as React from "react"
import { cn } from "@/lib/utils"

const StatCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { title: string, value: string, trend?: string }>(
  ({ className, title, value, trend, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "border border-primary bg-primary/5 p-4 notch-br relative overflow-hidden flex flex-col gap-2",
        className
      )}
      {...props}
    >
      <div className="text-xs text-muted-foreground uppercase tracking-widest">{title}</div>
      <div className="text-2xl font-bold text-primary glow-text">{value}</div>
      {trend && <div className="text-xs text-primary/80">{trend}</div>}
    </div>
  )
)
StatCard.displayName = "StatCard"

export { StatCard }
