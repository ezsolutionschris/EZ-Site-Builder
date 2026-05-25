"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "@/lib/instant";
import { site } from "@/lib/site";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const { isLoading, user } = db.useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) router.replace(next);
  }, [isLoading, user, router, next]);

  async function sendCode() {
    setError(null);
    setSubmitting(true);
    try {
      await db.auth.sendMagicCode({ email });
      setSentTo(email);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to send code.");
    } finally {
      setSubmitting(false);
    }
  }

  async function verifyCode() {
    setError(null);
    setSubmitting(true);
    try {
      await db.auth.signInWithMagicCode({ email, code });
      router.replace(next);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Invalid code. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 dark:bg-stone-950">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-6 text-center">
          <span className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            {site.productName}
          </span>
          <p className="mt-1 text-sm text-stone-500">
            {sentTo ? "Enter the code we emailed you" : "Sign in or create an account"}
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        )}

        {!sentTo ? (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendCode()}
              placeholder="you@example.com"
              className="rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
            />
            <button
              onClick={sendCode}
              disabled={submitting || !email.trim()}
              className="mt-1 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700 disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Send magic link"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
              6-digit code sent to {sentTo}
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verifyCode()}
              placeholder="123456"
              maxLength={6}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 tracking-widest"
            />
            <button
              onClick={verifyCode}
              disabled={submitting || code.length < 6}
              className="mt-1 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700 disabled:opacity-50"
            >
              {submitting ? "Verifying…" : "Sign in"}
            </button>
            <button
              onClick={() => { setSentTo(null); setCode(""); setError(null); }}
              className="text-sm text-stone-500 hover:text-stone-700 dark:hover:text-stone-300"
            >
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}