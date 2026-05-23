"use client";

type SitePreviewProps = {
  html?: string;
  imageUrl?: string;
};

export function SitePreview({ html, imageUrl }: SitePreviewProps) {
  if (!html && !imageUrl) {
    return (
      <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-100/80 px-6 text-center dark:border-stone-700 dark:bg-stone-900/50">
        <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
          Your site preview will appear here
        </p>
        <p className="mt-2 max-w-xs text-xs text-stone-500 dark:text-stone-500">
          Describe your business above and click Generate draft
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-900">
      <div className="border-b border-stone-200 px-4 py-2 dark:border-stone-700">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Draft preview
        </p>
      </div>
      <div className="relative flex-1 overflow-auto bg-stone-50 dark:bg-stone-950">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="Generated website screenshot"
            className="h-auto w-full object-contain"
          />
        ) : null}
        {html && !imageUrl ? (
          <iframe
            title="Generated site preview"
            srcDoc={html}
            sandbox=""
            className="h-[min(480px,60vh)] w-full border-0 bg-white"
          />
        ) : null}
        {html && imageUrl ? (
          <details className="border-t border-stone-200 p-3 dark:border-stone-700">
            <summary className="cursor-pointer text-sm font-medium text-stone-700 dark:text-stone-300">
              View HTML draft
            </summary>
            <iframe
              title="Generated site HTML"
              srcDoc={html}
              sandbox=""
              className="mt-3 h-64 w-full rounded-lg border border-stone-200 bg-white"
            />
          </details>
        ) : null}
      </div>
    </div>
  );
}
