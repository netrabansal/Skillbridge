"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import { RoleIcon } from "@/components/role-icon";
import { getRole, searchRoles } from "@/data/roles";
import { cn } from "@/lib/cn";

type RoleSearchProps = {
  query: string;
  onQueryChange: (q: string) => void;
  selectedSlug: string | null;
  onSelect: (slug: string | null) => void;
  inputRef?: React.Ref<HTMLInputElement>;
};

/**
 * Accessible combobox (WAI-ARIA 1.2 pattern) for finding a role by title, alternate title, tool or skill.
 * Arrow keys move through results, Enter picks one, Escape closes and then clears.
 */
export function RoleSearch({ query, onQueryChange, selectedSlug, onSelect, inputRef }: RoleSearchProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const selected = getRole(selectedSlug);

  // Once a role is picked the input shows its title; reopening should list every role so it's easy to switch.
  const effectiveQuery = selected && query === selected.title ? "" : query;
  const results = useMemo(() => searchRoles(effectiveQuery), [effectiveQuery]);
  const activeIndex = Math.min(active, Math.max(0, results.length - 1));
  const activeId = open && results[activeIndex] ? `${listId}-${results[activeIndex].role.slug}` : undefined;

  useEffect(() => {
    if (activeId) document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
  }, [activeId]);

  function pick(slug: string) {
    onSelect(slug);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setActive(0);
        } else setActive((activeIndex + 1) % Math.max(results.length, 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setActive(results.length - 1);
        } else setActive((activeIndex - 1 + results.length) % Math.max(results.length, 1));
        break;
      case "Enter":
        // Pick the highlighted role; with the list closed, Enter submits the form (Build My Roadmap).
        if (open && results[activeIndex]) {
          e.preventDefault();
          pick(results[activeIndex].role.slug);
        }
        break;
      case "Escape":
        if (open) setOpen(false);
        else if (query) {
          onQueryChange("");
          onSelect(null);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    // Not positioned: the results panel anchors to the nearest positioned ancestor (the search bar).
    <div className="flex min-w-0 flex-1 items-center">
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search for a technology role
      </label>
      <Search aria-hidden="true" className="ml-5 size-5 shrink-0 text-muted-foreground" />
      <input
        ref={inputRef}
        id={`${listId}-input`}
        type="text"
        role="combobox"
        autoComplete="off"
        spellCheck={false}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={`${listId}-list`}
        aria-activedescendant={activeId}
        placeholder="Search a role, skill or tool"
        value={query}
        onChange={(e) => {
          onQueryChange(e.target.value);
          if (selected && e.target.value !== selected.title) onSelect(null);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        className="h-14 w-full min-w-0 rounded-full bg-transparent pr-4 pl-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
      />

      <div
        hidden={!open}
        // Keep focus in the input while interacting with the list.
        onMouseDown={(e) => e.preventDefault()}
        className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-border bg-surface shadow-elev-3"
      >
        <ul id={`${listId}-list`} role="listbox" aria-label="Technology roles" className="max-h-80 overflow-y-auto p-2">
          {results.map(({ role, via }, i) => {
            const isSelected = role.slug === selectedSlug;
            return (
              <li
                key={role.slug}
                id={`${listId}-${role.slug}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => pick(role.slug)}
                onMouseMove={() => i !== activeIndex && setActive(i)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5",
                  i === activeIndex && "bg-surface-sunken",
                )}
              >
                <RoleIcon icon={role.icon} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{role.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {via ? <>Matches “{via}”</> : role.category}
                  </span>
                </span>
                {isSelected && <Check aria-hidden="true" className="size-4 shrink-0" />}
              </li>
            );
          })}
        </ul>
        {results.length === 0 && (
          <div className="px-5 py-6 text-sm">
            <p className="font-medium">No roles match “{query.trim()}”</p>
            <p className="mt-1 text-muted-foreground">
              Try a skill or tool like “Python” or “Docker”, or{" "}
              <Link href="/roles" className="font-medium text-foreground underline underline-offset-4">
                browse all roles
              </Link>
              .
            </p>
          </div>
        )}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {open ? (results.length ? `${results.length} roles available` : "No matching roles") : ""}
      </p>
    </div>
  );
}
