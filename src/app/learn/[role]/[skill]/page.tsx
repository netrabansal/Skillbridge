import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ClipboardCheck, Lightbulb } from "lucide-react";
import { ProgressPanel, StatusChip } from "@/components/learn/progress-panel";
import { ProjectList } from "@/components/learn/project-list";
import { ResourceList } from "@/components/learn/resource-list";
import { SkillPageProvider } from "@/components/learn/skill-page-context";
import { NextInPlan, SkillLinks } from "@/components/learn/skill-links";
import { TestKnowledgeButton } from "@/components/learn/test-knowledge-button";
import { TopicChecklist } from "@/components/learn/topic-checklist";
import { RoleIcon } from "@/components/role-icon";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getSkillLearning } from "@/data/learning";
import { getRole, roles } from "@/data/roles";
import { levelLabel } from "@/lib/assessment";
import { buildSkillQuiz, passMark } from "@/lib/quiz";

export function generateStaticParams() {
  return roles.flatMap((r) => r.categories.flatMap((c) => c.skills.map((s) => ({ role: r.slug, skill: s.id }))));
}

function resolve(roleSlug: string, skillId: string) {
  const role = getRole(roleSlug);
  const category = role?.categories.find((c) => c.skills.some((s) => s.id === skillId));
  const skill = category?.skills.find((s) => s.id === skillId);
  const learning = role && skill ? getSkillLearning(role.slug, skill.id) : undefined;
  return role && category && skill && learning ? { role, category, skill, ...learning } : null;
}

export async function generateMetadata({ params }: PageProps<"/learn/[role]/[skill]">): Promise<Metadata> {
  const { role, skill } = await params;
  const found = resolve(role, skill);
  return found
    ? { title: `${found.skill.name} · ${found.role.title}`, description: found.lesson.overview }
    : {};
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {intro && <p className="mt-1 text-sm text-muted-foreground">{intro}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function SkillLearningPage({ params }: PageProps<"/learn/[role]/[skill]">) {
  const { role: roleSlug, skill: skillId } = await params;
  const found = resolve(roleSlug, skillId);
  if (!found) notFound();
  const { role, category, skill, lesson, why } = found;
  const totalProjectHours = lesson.projects.reduce((n, p) => n + p.hours, 0);
  const quiz = buildSkillQuiz(role.slug, skill, lesson);
  const roleSpecific = quiz.filter((q) => q.level !== "Core").length;

  return (
    <SkillPageProvider role={role} skill={skill} lesson={lesson}>
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-24 sm:px-6 sm:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/roadmap" className="hover:text-foreground hover:underline underline-offset-4">
                My Roadmap
              </Link>
            </li>
            <ChevronRight aria-hidden="true" className="size-3.5" />
            <li>
              <Link href={`/roles/${role.slug}`} className="hover:text-foreground hover:underline underline-offset-4">
                {role.title}
              </Link>
            </li>
            <ChevronRight aria-hidden="true" className="size-3.5" />
            <li aria-current="page" className="text-foreground">
              {skill.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <header className="lg:col-start-1">
            <div className="flex items-center gap-3">
              <RoleIcon icon={role.icon} size="sm" />
              <Eyebrow>
                {category.name} · {category.phase}
              </Eyebrow>
            </div>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">{skill.name}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <StatusChip />
              <span className="text-sm text-muted-foreground">
                A {role.title} needs <span className="font-medium text-foreground">{levelLabel(skill.required)}</span>
              </span>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed">{lesson.overview}</p>
          </header>

          <aside aria-label="Your progress on this skill" className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-24">
              <ProgressPanel />
            </div>
          </aside>

          <div className="min-w-0 space-y-14 lg:col-start-1">
            <section aria-labelledby="why-title" className="rounded-2xl border border-border bg-surface-sunken/50 p-6">
              <h2 id="why-title" className="flex items-center gap-2 font-semibold">
                <Lightbulb aria-hidden="true" className="size-5" />
                Why it matters for a {role.title}
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{why}</p>
            </section>

            <div className="grid gap-8 md:grid-cols-2">
              <Section id="prerequisites" title="Prerequisites" intro="Skills to learn first, from your roadmap.">
                <SkillLinks kind="prerequisites" />
              </Section>
              <Section id="unlocks" title="Unlocks" intro="Skills that build on this one.">
                <SkillLinks kind="unlocks" />
              </Section>
            </div>

            <Section id="topics" title="Learning topics" intro="Work through these in order and tick each one off as you go.">
              <TopicChecklist />
            </Section>

            <Section
              id="resources"
              title="Recommended resources"
              intro="Official documentation and reputable learning platforms. Links open in a new tab."
            >
              <ResourceList resources={lesson.resources} />
            </Section>

            <Section
              id="projects"
              title="Practical projects"
              intro={`Build something real. About ${totalProjectHours} hours in total; finishing a project counts toward your level.`}
            >
              <ProjectList />
            </Section>

            <section aria-labelledby="test-title" className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border bg-surface-sunken">
                    <ClipboardCheck aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h2 id="test-title" className="text-xl font-semibold tracking-tight">
                      Test your knowledge
                    </h2>
                    <p className="mt-1 max-w-md text-sm text-muted-foreground">
                      {quiz.length} questions, {roleSpecific ? `including ${roleSpecific} written for a ${role.title}` : "on the core ideas"}.
                      Pass mark {passMark(quiz.length)} of {quiz.length}. A score alone never changes your level: passing
                      counts toward Comfortable once every topic and a project are done, and full marks toward Mastered.
                    </p>
                  </div>
                </div>
                <TestKnowledgeButton />
              </div>
            </section>

            <NextInPlan />
          </div>
        </div>
      </div>
    </SkillPageProvider>
  );
}
