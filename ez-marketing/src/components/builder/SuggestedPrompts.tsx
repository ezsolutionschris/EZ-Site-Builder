"use client";

import { suggestedPrompts } from "@/lib/site";

type SuggestedPromptsProps = {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
};

export function SuggestedPrompts({ onSelect, disabled }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestedPrompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-left text-xs font-medium text-stone-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400 dark:hover:border-amber-800 dark:hover:bg-amber-950/40 dark:hover:text-stone-100 sm:text-sm"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
