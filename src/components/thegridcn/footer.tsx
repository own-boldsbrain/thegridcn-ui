"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface FooterSocial {
  label: string
  href: string
  icon: React.ReactNode
}

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  columns?: FooterColumn[]
  socials?: FooterSocial[]
  copyright?: string
}

export function Footer({
  logo,
  columns = [],
  socials = [],
  copyright,
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      data-slot="tron-footer"
      className={cn(
        "relative overflow-hidden border-t border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Top edge glow */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-primary/5 to-transparent" />

      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        {/* Main footer content */}
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          {/* Logo & socials column */}
          <div className="space-y-5">
            {logo && <div className="flex items-center">{logo}</div>}

            {socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded border border-primary/20 text-foreground/50 transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_10px_rgba(var(--primary-rgb,0,180,255),0.1)]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.length > 0 && (
            <div
              className={cn(
                "grid gap-8",
                columns.length === 1 && "grid-cols-1",
                columns.length === 2 && "grid-cols-2",
                columns.length >= 3 && "grid-cols-2 sm:grid-cols-3",
                columns.length >= 4 && "grid-cols-2 sm:grid-cols-4"
              )}
            >
              {columns.map((column, i) => (
                <div key={i} className="space-y-3">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                    {column.title}
                  </h4>
                  <ul className="space-y-2">
                    {column.links.map((link, j) => (
                      <li key={j}>
                        <a
                          href={link.href}
                          {...(link.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="text-xs text-foreground/60 transition-colors duration-200 hover:text-primary"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        {copyright && (
          <>
            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Copyright bar */}
            <div className="mt-4 flex items-center justify-center">
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                {copyright}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/40" />
    </footer>
  )
}
