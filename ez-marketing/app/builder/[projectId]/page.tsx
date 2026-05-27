"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db } from "@/lib/instant";
import { site } from "@/lib/site";
import { SiteBuilderChat } from "@/components/builder/SiteBuilderChat";
import Link from "next/link";

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const { isLoading: authLoading, user } = db.useAuth();
  const { data, isLoading: dataLoading } = db.useQuery(
    projectId ? { projects: { $: { where: { id: projectId } } } } : null,
  );

  const [projectName, setProjectName] = useState("");
  const [editingName, setEditingName] = useState(false);

  const project = data?.projects?.[0];

  useEffect(() => {
    if (!authLoading && !user) router.replace(`/login?next=/builder/${projectId}`);
  }, [authLoading, user, router, projectId]);

  useEffect(() => {
    if (project?.name) setProjectName(project.name);
  }, [project?.name]);

  async function saveName() {
    if (!projectName.trim() || !project) return;
    await db.transact(
      db.tx.projects[project.id].update({ name: projectName.trim(), updatedAt: Date.now() }),
    );
    setEditingName(false);
  }

  async function signOut() {
    await db.auth.signOut();
    router.replace("/login");
  }

  if (authLoading || dataLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-stone-500">Project not found.</p>
        <Link href="/dashboard" className="text-sm text-amber-600 hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-stone-950">
      <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              ← Dashboard
            </Link>
            <span className="text-stone-300 dark:text-stone-700">/</span>
            {editingName ? (
              <input
                autoFocus
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                onBlur={saveName}
                onKeyDown={(e) => e.key === "Enter" && saveName()}
                className="rounded border border-amber-400 bg-transparent px-2 py-0.5 text-sm font-medium text-stone-900 focus:outline-none dark:text-stone-100"
              />
            ) : (
              <button
                onClick={() => setEditingName(true)}
                className="text-sm font-medium text-stone-900 hover:text-amber-600 dark:text-stone-100"
                title="Click to rename"
              >
                {project.name}
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-500">{user.email}</span>
            <button
              onClick={signOut}
              className="text-sm text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <SiteBuilderChat
          projectId={projectId}
          stitchProjectId={project.stitchProjectId || undefined}
          initialHtml={project.lastHtml ?? undefined}
          initialImageUrl={project.lastImageUrl ?? undefined}
          onDraftSaved={async (draft) => {
            await db.transact(
              db.tx.projects[project.id].update({
                stitchProjectId: draft.stitchProjectId,
                lastHtml: draft.html ?? null,
                lastImageUrl: draft.imageUrl ?? null,
                updatedAt: Date.now(),
              }),
            );
          }}
        />
      </main>
    </div>
  );
}