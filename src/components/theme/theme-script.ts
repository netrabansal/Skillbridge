export const THEME_STORAGE_KEY = "sb-theme";
export type ThemeMode = "light" | "dark" | "system";

/**
 * Runs synchronously in <head> before first paint so the correct theme is applied with no flash.
 * Resolves "system" against prefers-color-scheme and keeps following OS changes while in that mode.
 */
export const themeScript = `(function(){var k="${THEME_STORAGE_KEY}",d=document.documentElement,q=window.matchMedia("(prefers-color-scheme: dark)");function g(){try{return localStorage.getItem(k)||"system"}catch(e){return "system"}}function a(){var m=g();d.setAttribute("data-theme",m==="system"?(q.matches?"dark":"light"):m)}a();q.addEventListener("change",a);window.addEventListener("storage",function(e){if(e.key===k)a()})})()`;
