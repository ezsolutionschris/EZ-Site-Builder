"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/instant";
import { id } from "@instantdb/react";
import { site } from "@/lib/site";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { isLoading: authLoading, user } = db.useAuth();
  const { data, isLoading: dataLoading } = db.useQuery({ projects: {} });

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login?next=/dashboard");
  }, [authLoading, user, router]);

  async function createProject() {
    if (!user) return;
    const projectId = id();
    await db.transact([
      db.tx.projects[projectId].update({
        name: "Untitled project",
        stitchProjectId: "",
        lastHtml: null,
        lastImageUrl: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }),
      db.tx.projects[projectId].link({ creator: user.id }),
    ]);
    router.push(`/builder/${projectId}`);
  }

  async function deleteProject(projectId: string) {
    await db.transact([db.tx.projects[projectId].delete()]);
  }

  async function signOut() {
    await db.auth.signOut();
    router.replace("/login");
  }

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
      </div>
    );
  }

  const projects = data?.projects ?? [];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <header className="border-b border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold text-stone-900 dark:text-stone-100">
            {site.productName}
          </Link>
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

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
            My projects
          </h1>
          <button
            onClick={createProject}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
          >
            + New project
          </button>
        </div>

        {dataLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-20 text-center dark:border-stone-700">
            <p className="text-stone-500">No projects yet.</p>
            <button
              onClick={createProject}
              className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700"
            >
              Create your first project
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
              >
                {project.lastImageUrl ? (
                  <img
                    src={project.lastImageUrl}
                    alt={project.name}
                    className="mb-4 h-36 w-full rounded-lg object-cover object-top"
                  />
                ) : (
                  <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-stone-100 text-sm text-stone-400 dark:bg-stone-800">
                    No preview yet
                  </div>
                )}
                <h2 className="font-medium text-stone-900 dark:text-stone-100">
                  {project.name}
                </h2>
                <p className="mt-1 text-xs text-stone-400">
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/builder/${project.id}`}
                    className="flex-1 rounded-lg bg-amber-600 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-amber-700"
                  >
                    Open
                  </Link>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-500 transition hover:border-red-300 hover:text-red-600 dark:border-stone-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
