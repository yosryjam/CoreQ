import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { StatusTone } from "@/domain/types";

/* ------------------------------------------------------------------ Card */

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-border px-5 py-4",
        className,
      )}
    >
      <div>
        <h3 className="text-[15px] font-semibold text-fg">{title}</h3>
        {description ? (
          <p className="mt-0.5 text-[13px] text-fg-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function CardBody({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("px-5 py-4", className)}>{children}</div>;
}

/* ---------------------------------------------------------------- Button */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  variant = "secondary",
  className,
  children,
  type = "button",
  ...rest
}: {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-fg-inverse hover:bg-primary-hover active:bg-primary-active border-transparent",
    secondary:
      "bg-surface text-fg hover:bg-surface-muted border-border-strong",
    ghost: "bg-transparent text-fg-muted hover:bg-surface-muted border-transparent",
    danger: "bg-danger text-fg-inverse hover:brightness-95 border-transparent",
  };
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3.5 text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ----------------------------------------------------------------- Badge */

const toneClasses: Record<StatusTone, string> = {
  success: "bg-success-tint text-success",
  warning: "bg-warning-tint text-warning",
  danger: "bg-danger-tint text-danger",
  info: "bg-info-tint text-info",
  neutral: "bg-neutral-tint text-neutral",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: StatusTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[12px] font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small solid dot for inline status. */
export function StatusDot({ tone = "neutral" }: { tone?: StatusTone }) {
  const dot: Record<StatusTone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
    neutral: "bg-neutral",
  };
  return <span className={cn("inline-block size-2 rounded-full", dot[tone])} />;
}

/* ------------------------------------------------------------- Progress */

export function ProgressBar({
  value,
  tone = "info",
}: {
  value: number;
  tone?: StatusTone;
}) {
  const fill: Record<StatusTone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-primary",
    neutral: "bg-neutral",
  };
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-tint">
      <div
        className={cn("h-full rounded-full", fill[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

/* ----------------------------------------------------------- PageHeader */

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-fg">{title}</h1>
        {description ? (
          <p className="mt-1 text-[13px] text-fg-muted">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------- StatCard */

export function StatCard({
  label,
  value,
  hint,
  delta,
  tone = "neutral",
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  delta?: number;
  tone?: StatusTone;
  icon?: ReactNode;
}) {
  const deltaTone =
    delta === undefined
      ? "text-fg-subtle"
      : delta > 0
        ? "text-success"
        : delta < 0
          ? "text-danger"
          : "text-fg-subtle";
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <p className="text-[13px] font-medium text-fg-muted">{label}</p>
        {icon ? (
          <span className={cn("rounded-md p-1.5", toneClasses[tone])}>{icon}</span>
        ) : null}
      </div>
      <p className="mt-3 text-2xl font-semibold tabular text-fg">{value}</p>
      <div className="mt-1 flex items-center gap-2 text-[12px]">
        {delta !== undefined ? (
          <span className={cn("font-medium tabular", deltaTone)}>
            {delta > 0 ? "+" : ""}
            {delta}%
          </span>
        ) : null}
        {hint ? <span className="text-fg-subtle">{hint}</span> : null}
      </div>
    </Card>
  );
}

/* ----------------------------------------------------------- EmptyState */

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface-muted px-6 py-14 text-center">
      <p className="text-[14px] font-medium text-fg">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-[13px] text-fg-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
