/**
 * App-wide notifications. The <Toaster> lives in the root layout, which persists across client-side navigation,
 * so a toast raised just before router.push() is still shown on the next page.
 */
export type ToastTone = "success" | "info" | "error";
export type Toast = { id: number; tone: ToastTone; title: string; description?: string };

export const TOAST_EVENT = "sb-toast";
let nextId = 1;

export function toast(title: string, options: { tone?: ToastTone; description?: string } = {}) {
  if (typeof window === "undefined") return;
  const detail: Toast = { id: nextId++, tone: options.tone ?? "success", title, description: options.description };
  window.dispatchEvent(new CustomEvent<Toast>(TOAST_EVENT, { detail }));
}
