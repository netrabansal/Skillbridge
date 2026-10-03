"use client";

import { useEffect, useRef, useState } from "react";

function luminance(hex: string) {
  const m = hex.replace("#", "").match(/.{2}/g);
  if (!m || m.length < 3) return null;
  const [r, g, b] = m.slice(0, 3).map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Shows a token's live value, read from CSS at runtime so this page can never drift from globals.css.
 * Pass `against` to also show the WCAG contrast ratio of this token on another token.
 */
export function TokenSwatch({ token, name, note, against }: { token: string; name: string; note?: string; against?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [ratio, setRatio] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const s = getComputedStyle(el);
      const v = s.getPropertyValue(token).trim();
      setValue(v);
      setRatio(against ? contrast(v, s.getPropertyValue(against).trim()) : null);
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, [token, against]);

  return (
    <div ref={ref} className="flex items-center gap-3">
      <div className="size-10 shrink-0 rounded-md border border-border" style={{ background: `var(${token})` }} />
      <div className="min-w-0 text-sm">
        <p className="font-medium">{name}</p>
        <p className="font-mono text-xs text-muted-foreground uppercase">
          {value || " "}
          {ratio !== null && (
            <span className={ratio >= 4.5 ? "" : "text-danger"}>
              {" · "}
              {ratio.toFixed(1)}:1 {ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA large" : "fail"}
            </span>
          )}
        </p>
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>
    </div>
  );
}
