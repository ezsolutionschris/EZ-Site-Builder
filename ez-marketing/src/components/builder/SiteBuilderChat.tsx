"use client";

import { useCallback, useRef, useState } from "react";
import { site } from "@/lib/site";
import { ChatMessage } from "./ChatMessage";
import { ChatPrompt } from "./ChatPrompt";
import { SitePreview } from "./SitePreview";
import { SuggestedPrompts } from "./SuggestedPrompts";

type Message = { role: "user" | "assistant"; content: string };
type PreviewState = { html?: string; imageUrl?: string };

type ChatResponse = {
  reply?: string;
  error?: string;
  sessionId?: string;
  projectId?: string;
  preview?: PreviewState;
  status: "generated" | "error";
};

type DraftSavedPayload = {
  stitchProjectId: string;
  html?: string;
  imageUrl?: string;
};

type Props = {
  projectId?: string;
  stitchProjectId?: string;
  initialHtml?: string;
  initialImageUrl?: string;
  onDraftSaved?: (draft: DraftSavedPayload) => Promise<void>;
};

export function SiteBuilderChat({
  projectId,
  stitchProjectId,
  initialHtml,
  initialImageUrl,
  onDraftSaved,
}: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Welcome to ${site.productName}. Tell us about your business and we'll draft a homepage layout you can preview right away.`,
    },
  ]);
  const [preview, setPreview] = useState<PreviewState>({
    html: initialHtml,
    imageUrl: initialImageUrl,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sessionIdRef = useRef<string | undefined>(undefined);
  const stitchProjectIdRef = useRef<string | undefined>(stitchProjectId);
  const liveRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            sessionId: sessionIdRef.current,
            projectId: stitchProjectIdRef.current,
          }),
        });

        const data = (await res.json()) as ChatResponse;

        if (!res.ok) {
          throw new Error(data.error ?? "Failed to generate draft");
        }

        if (data.sessionId) sessionIdRef.current = data.sessionId;
        if (data.projectId) stitchProjectIdRef.current = data.projectId;

        if (data.preview) setPreview(data.preview);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.reply ??
              "Your draft is ready. Review the preview and send another message to refine it.",
          },
        ]);

        if (onDraftSaved && data.projectId) {
          await onDraftSaved({
            stitchProjectId: data.projectId,
            html: data.preview?.html,
            imageUrl: data.preview?.imageUrl,
          });
        }
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Something went wrong. Try again.";
        setError(msg);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `${msg} You can also schedule a consultation with ${site.name} for hands-on help.`,
          },
        ]);
      } finally {
        setLoading(false);
        liveRef.current?.focus();
      }
    },
    [loading, onDraftSaved],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col gap-5">
        <div
          ref={liveRef}
          tabIndex={-1}
          aria-live="polite"
          aria-relevant="additions"
          className="flex max-h-[min(320px,40vh)] flex-col gap-3 overflow-y-auto rounded-2xl border border-stone-200 bg-stone-50/50 p-4 dark:border-stone-800 dark:bg-stone-900/30"
          role="list"
        >
          {messages.map((msg, i) => (
            <ChatMessage key={`${msg.role}-${i}`} role={msg.role} content={msg.content} />
          ))}
          {loading ? (
            <div className="flex justify-start" role="status">
              <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-500 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-amber-600" />
                  Generating your site draft…
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
            {error}
          </p>
        ) : null}

        <SuggestedPrompts
          onSelect={(p) => setInput(p)}
          disabled={loading}
        />

        <ChatPrompt
          value={input}
          onChange={setInput}
          onSubmit={() => sendMessage(input)}
          disabled={loading}
        />

        <p className="text-xs text-stone-500 dark:text-stone-500">
          Powered by Google Stitch · Preview is a draft, not a live site.{" "}
          <a
            href={site.links.consultation}
            className="font-medium text-amber-800 underline-offset-2 hover:underline dark:text-amber-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk to our team
          </a>
        </p>
      </div>

      <SitePreview html={preview.html} imageUrl={preview.imageUrl} />
    </div>
  );
}