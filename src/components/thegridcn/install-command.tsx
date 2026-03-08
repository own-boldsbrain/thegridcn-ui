"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/thegridcn/copy-button"

type PackageManager = "npm" | "yarn" | "pnpm" | "bun"

interface InstallCommandProps extends React.HTMLAttributes<HTMLDivElement> {
  packageName: string
  packageManager?: PackageManager | "auto"
  command?: string
}

const managerCommands: Record<PackageManager, string> = {
  npm: "npm install",
  yarn: "yarn add",
  pnpm: "pnpm add",
  bun: "bun add",
}

const allManagers: PackageManager[] = ["npm", "yarn", "pnpm", "bun"]

export function InstallCommand({
  packageName,
  packageManager = "auto",
  command,
  className,
  ...props
}: InstallCommandProps) {
  const [activeManager, setActiveManager] = React.useState<PackageManager>(
    packageManager === "auto" ? "npm" : packageManager
  )

  const showTabs = packageManager === "auto"

  const fullCommand = command
    ? command
    : `${managerCommands[activeManager]} ${packageName}`

  return (
    <div
      data-slot="tron-install-command"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-primary/40" />

      {/* Package manager tabs */}
      {showTabs && (
        <div className="relative flex border-b border-primary/15">
          {allManagers.map((manager) => (
            <button
              key={manager}
              type="button"
              onClick={() => setActiveManager(manager)}
              className={cn(
                "relative px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest transition-all",
                activeManager === manager
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/40 hover:text-foreground/60"
              )}
            >
              {manager}
              {activeManager === manager && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/60 shadow-[0_0_4px_rgba(var(--primary-rgb,0,180,255),0.3)]" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Command display */}
      <div className="relative flex items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="shrink-0 font-mono text-xs text-foreground/30">
            $
          </span>
          <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground/70">
            {fullCommand}
          </code>
        </div>
        <CopyButton
          value={fullCommand}
          variant="ghost"
          size="sm"
          className="shrink-0"
        />
      </div>

      {/* Bottom glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  )
}
