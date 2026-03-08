"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Accordion as ShadcnAccordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

interface TronAccordionItem {
  /** Unique value identifier for the item. Defaults to index if omitted. */
  value?: string
  /** Content shown in the trigger / header */
  trigger: React.ReactNode
  /** Content revealed when the item is expanded */
  content: React.ReactNode
}

interface TronAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of accordion items to render */
  items: TronAccordionItem[]
  /** Whether one or multiple items can be open at once */
  type?: "single" | "multiple"
  /** Value(s) open by default. String for single, string[] for multiple. */
  defaultValue?: string | string[]
  /** Optional label displayed above the accordion */
  label?: string
}

export function TronAccordion({
  items,
  type = "single",
  defaultValue,
  label,
  className,
  ...props
}: TronAccordionProps) {
  // Build the correct props for each accordion variant
  const accordionProps =
    type === "multiple"
      ? {
          type: "multiple" as const,
          defaultValue: Array.isArray(defaultValue)
            ? defaultValue
            : defaultValue
              ? [defaultValue]
              : undefined,
        }
      : {
          type: "single" as const,
          collapsible: true,
          defaultValue: Array.isArray(defaultValue)
            ? defaultValue[0]
            : defaultValue,
        }

  return (
    <div
      data-slot="tron-accordion"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label && (
        <div className="border-b border-primary/20 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
          {label}
        </div>
      )}

      <ShadcnAccordion {...accordionProps} className="relative">
        {items.map((item, i) => {
          const value = item.value ?? `item-${i}`
          return (
            <AccordionItem
              key={value}
              value={value}
              className="border-b border-primary/10 last:border-b-0"
            >
              <AccordionTrigger
                className={cn(
                  "px-5 py-4 font-mono text-sm text-foreground/90",
                  "hover:no-underline hover:bg-primary/5",
                  "transition-colors",
                  "[&[data-state=open]]:text-primary [&[data-state=open]]:shadow-[inset_2px_0_0_0_hsl(var(--primary))]"
                )}
              >
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 text-xs leading-relaxed text-foreground/50">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </ShadcnAccordion>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
