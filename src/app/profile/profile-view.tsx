"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CircleAlert, CircleCheck, Download, HardDrive, Plus, Trash2, Upload } from "lucide-react";
import { SetupDetails } from "@/components/progress/setup-details";
import { NoSetupState, PageIntro, SetupLoading } from "@/components/progress/setup-states";
import { RoleIcon } from "@/components/role-icon";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getRole, roles } from "@/data/roles";
import { careerSummaries, type CareerSummary } from "@/lib/progress";
import { createBackup, readBackup, UNREADABLE_KEY } from "@/lib/persistence";
import { actions, readUnreadableData, snapshotState, useAppState, useStorageHealth, type AppState } from "@/lib/store";
import { toast } from "@/lib/toast";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

function download(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function ProfileView() {
  const state = useAppState();
  if (state === undefined) {
    return (
      <>
        <PageIntro eyebrow="Profile" title="Your profile" />
        <SetupLoading />
      </>
    );
  }
  const role = getRole(state.setup?.roleSlug);

  return (
    <>
      <PageIntro eyebrow="Profile" title="Your profile" />

      <div className="mb-8 flex gap-3 rounded-2xl border border-info/30 bg-info-soft p-4 text-sm">
        <HardDrive aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-info" />
        <div>
          <p className="font-semibold text-info">Saved on this device, not in an account</p>
          <p className="mt-1 text-foreground/80">
            SkillBridge doesn&apos;t have accounts yet. Your progress is stored in this browser only: it isn&apos;t synced to
            other devices or browsers, and clearing your browser data deletes it.{" "}
            <a href="#your-data" className="font-medium underline underline-offset-4">
              Download a backup
            </a>{" "}
            to keep a copy.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {state.setup && role ? (
          <SetupDetails setup={state.setup} role={role} />
        ) : (
          <NoSetupState title="No career goal yet" body="Set your target role and starting point to personalize SkillBridge." />
        )}

        <Careers state={state} />

        <section aria-labelledby="prefs-title" className="rounded-2xl border border-border bg-surface p-6">
          <h2 id="prefs-title" className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Preferences
          </h2>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-medium">Appearance</p>
              <p className="text-sm text-muted-foreground">Light, dark, or match your device.</p>
            </div>
            <ThemeToggle />
          </div>
        </section>

        <YourData state={state} />
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------------------------------------------

function Careers({ state }: { state: AppState }) {
  const careers = careerSummaries(state, roles);
  return (
    <section aria-labelledby="careers-title" className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="careers-title" className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Your careers
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Each career keeps its own assessment, roadmap and learning progress. Starting another one never overwrites
            these; switch between them any time.
          </p>
        </div>
        <Link href="/start" className={buttonVariants({ variant: "secondary", size: "sm" })}>
          <Plus aria-hidden="true" />
          Start another career
        </Link>
      </div>

      {careers.length === 0 ? (
        <p className="mt-5 rounded-xl bg-surface-sunken/70 px-4 py-3 text-sm text-muted-foreground">
          No careers yet.{" "}
          <Link href="/start" className="font-medium text-foreground underline underline-offset-4">
            Choose your first career goal
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-5 space-y-3">
          {careers.map((c) => (
            <CareerRow key={c.role.slug} career={c} canSwitch={Boolean(state.setup)} />
          ))}
        </ul>
      )}
    </section>
  );
}

function CareerRow({ career, canSwitch }: { career: CareerSummary; canSwitch: boolean }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { role } = career;
  const status = career.generated
    ? `Roadmap · ${career.percent}% · ${career.completed} of ${career.total} skills complete`
    : career.rated > 0
      ? `Assessment in progress · ${career.rated} of ${career.total} rated`
      : "Not assessed yet";

  function switchHere() {
    actions.switchGoal(role.slug);
    toast(`${role.title} is now your active goal`, { description: "Your other careers are saved and unchanged." });
  }

  return (
    <li className="rounded-xl border border-border p-4">
      <div className="flex flex-wrap items-center gap-4">
        <RoleIcon icon={role.icon} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold tracking-tight">{role.title}</p>
            {career.isActive ? <Badge tone="info">Active goal</Badge> : <Badge>Saved</Badge>}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {status}
            {career.lastActivityAt && ` · last active ${formatDate(career.lastActivityAt)}`}
          </p>
          {career.generated && <Progress value={career.percent} label={`${role.title} progress`} className="mt-2 h-1.5 max-w-xs" />}
        </div>
        <div className="flex flex-wrap gap-2">
          {career.isActive ? (
            <Link href={career.generated ? "/roadmap" : "/assess"} className={buttonVariants({ size: "sm" })}>
              {career.generated ? "Open roadmap" : "Continue assessment"}
            </Link>
          ) : canSwitch ? (
            <Button size="sm" onClick={switchHere}>
              Make active goal
            </Button>
          ) : (
            <Link href={`/start?role=${role.slug}`} className={buttonVariants({ size: "sm" })}>
              Set up this goal
            </Link>
          )}
          {!confirmDelete && (
            <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(true)} aria-label={`Delete ${role.title} progress`}>
              <Trash2 aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>
      {confirmDelete && (
        <div role="group" aria-label={`Confirm deleting ${role.title} progress`} className="mt-4 flex flex-col gap-3 rounded-lg bg-danger-soft p-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-danger">
            Delete the {role.title} assessment, roadmap, learning progress and activity? This can&apos;t be undone.
            {career.isActive && " It stays your goal, but starts from scratch."}
          </p>
          <div className="flex shrink-0 gap-2">
            <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-danger text-background hover:bg-danger/90"
              onClick={() => {
                actions.deleteCareer(role.slug);
                setConfirmDelete(false);
                toast(`${role.title} progress deleted`, { tone: "info" });
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}

// ---------------------------------------------------------------------------------------------------------------

type PendingImport = { state: AppState; fileName: string; careers: number };

function YourData({ state }: { state: AppState }) {
  const health = useStorageHealth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<PendingImport | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [unreadable, setUnreadable] = useState(() => readUnreadableData());
  const size = new Blob([JSON.stringify(state)]).size;
  const careers = careerSummaries(state, roles).length;

  async function onFile(file: File | undefined) {
    setImportError(null);
    setPending(null);
    if (!file) return;
    const result = readBackup(await file.text());
    if (!result.ok) {
      setImportError(result.error);
      return;
    }
    setPending({ state: result.state, fileName: file.name, careers: careerSummaries(result.state, roles).length });
  }

  return (
    <section id="your-data" aria-labelledby="data-title" className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6">
      <h2 id="data-title" className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Your data
      </h2>

      <div className="mt-5 flex items-start gap-3 text-sm">
        {health?.status === "memory" ? (
          <>
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
            <p>
              <span className="font-medium text-danger">Not being saved.</span> This browser is blocking storage or it&apos;s full.
              Download a backup before closing this tab.
            </p>
          </>
        ) : (
          <>
            <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success" />
            <p>
              <span className="font-medium">Saved automatically in this browser</span>
              {health?.lastSavedAt && ` · last saved ${new Date(health.lastSavedAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`}
            </p>
          </>
        )}
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        {[
          { label: "Careers", value: careers },
          { label: "Activity entries", value: state.activity.length },
          { label: "Learning days", value: state.learningDays.length },
          { label: "Size", value: `${(size / 1024).toFixed(1)} KB` },
        ].map((d) => (
          <div key={d.label} className="rounded-lg bg-surface-sunken/60 px-3 py-2">
            <dt className="text-xs text-muted-foreground">{d.label}</dt>
            <dd className="font-label text-lg tabular-nums">{d.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            download(`skillbridge-backup-${new Date().toISOString().slice(0, 10)}.json`, createBackup(snapshotState()));
            toast("Backup downloaded", { description: "Import it here to restore your progress in any browser." });
          }}
        >
          <Download aria-hidden="true" />
          Download backup
        </Button>
        <Button variant="secondary" onClick={() => fileRef.current?.click()}>
          <Upload aria-hidden="true" />
          Import backup
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          aria-label="Choose a SkillBridge backup file"
          onChange={(e) => {
            void onFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>

      {importError && (
        <p role="alert" className="mt-4 flex gap-2 rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {importError} Nothing was changed.
        </p>
      )}

      {pending && (
        <div role="group" aria-label="Confirm import" className="mt-4 rounded-xl border border-warning/40 bg-warning-soft p-4 text-sm">
          <p className="font-medium text-warning">Replace everything saved in this browser?</p>
          <p className="mt-1 text-foreground/80">
            {pending.fileName} contains {pending.careers} {pending.careers === 1 ? "career" : "careers"}
            {pending.state.setup ? ` with ${getRole(pending.state.setup.roleSlug)?.title} as the active goal` : ""}. Your current
            progress will be replaced. Download a backup first if you want to keep it.
          </p>
          <div className="mt-3 flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPending(null)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                actions.replaceState(pending.state);
                setPending(null);
                toast("Backup imported", { description: "Your progress has been restored." });
              }}
            >
              Replace my data
            </Button>
          </div>
        </div>
      )}

      {unreadable && (
        <div className="mt-6 rounded-xl border border-border p-4 text-sm">
          <p className="font-medium">Unreadable saved data</p>
          <p className="mt-1 text-muted-foreground">
            Some previously saved data couldn&apos;t be read, so it was set aside instead of being deleted.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={() => download("skillbridge-unreadable-data.json", unreadable)}>
              <Download aria-hidden="true" />
              Download it
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                try {
                  localStorage.removeItem(UNREADABLE_KEY);
                } catch {}
                setUnreadable(null);
                toast("Unreadable data discarded", { tone: "info" });
              }}
            >
              Discard it
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-border pt-6">
        <p className="font-medium">Start over</p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-md text-sm text-muted-foreground">
            Delete every career, assessment, roadmap, learning record and streak from this browser. This can&apos;t be undone.
          </p>
          {confirmReset ? (
            <div className="flex gap-2" role="group" aria-label="Confirm reset">
              <Button variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
              <Button
                className="bg-danger text-background hover:bg-danger/90"
                onClick={() => {
                  actions.clearAll();
                  setConfirmReset(false);
                  toast("All progress cleared", { tone: "info" });
                }}
              >
                Yes, clear everything
              </Button>
            </div>
          ) : (
            <Button variant="secondary" onClick={() => setConfirmReset(true)}>
              Reset everything
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
