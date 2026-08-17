"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";

export function LogoMark({ className = "w-6 h-6", size = 24 }: { className?: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="Pruv logo"
      width={size}
      height={size}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
      }}
      className={`inline-block flex-shrink-0 object-contain rounded-[7px] shadow-sm ${className}`}
    />
  );
}

export function Logo({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const pixelSize = size === "sm" ? 20 : size === "lg" ? 28 : 24;
  const textSize = size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";

  return (
    <span className={`inline-flex items-center gap-2 font-extrabold text-[#18181B] tracking-tight ${textSize} ${className}`}>
      <LogoMark size={pixelSize} />
      <span>Pruv</span>
    </span>
  );
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function ProductNav() {
  return (
    <header className="max-w-[580px] w-full mx-auto mb-8 sm:mb-12">
      <div className="bg-white/95 backdrop-blur-md border border-[#E9E4DC] shadow-[0_4px_24px_rgba(0,0,0,0.05)] rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        <Link href="/" className="hover:opacity-90 transition-opacity flex-shrink-0">
          <Logo size="sm" />
        </Link>

        <nav className="hidden sm:flex items-center gap-5 text-[13px] font-medium text-[#52525B]">
          <Link href="/#how" className="hover:text-[#18181B] transition-colors">
            How it works
          </Link>
          <Link href="/demo" className="hover:text-[#18181B] transition-colors">
            Demo
          </Link>
        </nav>

        <Link
          href="/start"
          className="bg-[#5B4FE8] hover:bg-[#4E42DC] text-white text-[11.5px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-[0_2px_10px_rgba(91,79,232,0.28)] transition-all flex-shrink-0"
        >
          Start Review
        </Link>
      </div>
    </header>
  );
}

export function PrimaryButton({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-xl bg-[#5B4FE8] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(91,79,232,0.3)] transition-all hover:bg-[#4E42DC] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl bg-[#5B4FE8] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(91,79,232,0.3)] transition-all hover:bg-[#4E42DC] active:scale-[0.98] ${className}`}
    >
      {children}
    </Link>
  );
}

export function SecondaryLink({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-xl border border-[#E8E8E8] bg-white px-5 py-3 text-sm font-semibold text-[#18181B] shadow-sm transition-all hover:bg-[#F9F9FB] ${className}`}
    >
      {children}
    </Link>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[24px] border border-[#EBE7E0] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

export function ReceiptCard({
  product,
  metrics,
}: {
  product: string;
  metrics: Array<{ concern: string; delta: number | null }>;
}) {
  return (
    <div className="rounded-[24px] border border-[#EBE7E0] bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between border-b border-[#F0EDF6] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D4AFF]">
            Proof Receipt
          </span>
          <h3 className="text-lg font-bold text-[#18181B]">{product}</h3>
        </div>
        <span className="rounded-full bg-[#F3F0FF] px-2.5 py-1 text-xs font-bold text-[#6D4AFF]">
          Verified
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-xl border border-[#F0EDF6] bg-[#FCFBFE] px-4 py-2.5 text-sm"
          >
            <span className="font-medium capitalize text-[#18181B]">{m.concern}</span>
            <span
              className={`font-bold font-mono ${
                m.delta && m.delta > 0
                  ? "text-[#16A34A]"
                  : m.delta && m.delta < 0
                  ? "text-[#EA580C]"
                  : "text-[#71717A]"
              }`}
            >
              {m.delta !== null && m.delta !== undefined
                ? `${m.delta > 0 ? "+" : ""}${m.delta.toFixed(1)}`
                : "—"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-[#F0EDF6] pt-3 text-center text-[11px] text-[#A1A1AA]">
        Measured with YouCam Skin AI 🪄
      </div>
    </div>
  );
}
