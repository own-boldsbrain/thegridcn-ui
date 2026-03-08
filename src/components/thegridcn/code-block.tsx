"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  CodeBlock as BaseCodeBlock,
  CodeBlockHeader,
  CodeBlockIcon,
  CodeBlockGroup,
  CodeBlockContent,
} from "@/components/code-block/code-block"
import { CodeBlockShiki } from "@/components/code-block/shiki"
import { CopyButton } from "@/components/thegridcn/copy-button"

interface TronCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
}

export function TronCodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = true,
  highlightLines: _highlightLines,
  className,
  ...props
}: TronCodeBlockProps) {
  const displayLabel = filename || language

  return (
    <div
      data-slot="tron-code-block"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        "shadow-[0_0_15px_rgba(var(--primary-rgb,0,180,255),0.06)]",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/40" />

      <BaseCodeBlock className="bg-transparent">
        {/* Header bar */}
        <CodeBlockHeader className="border-b border-primary/15 bg-black/40">
          <CodeBlockGroup>
            <CodeBlockIcon language={language} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              {displayLabel}
            </span>
          </CodeBlockGroup>
          <CopyButton value={code} variant="ghost" size="sm" />
        </CodeBlockHeader>

        {/* Code content */}
        <CodeBlockContent className="bg-transparent">
          <CodeBlockShiki
            code={code}
            language={language}
            lineNumbers={showLineNumbers}
          />
        </CodeBlockContent>
      </BaseCodeBlock>
    </div>
  )
}
