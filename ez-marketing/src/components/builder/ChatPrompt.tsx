"use client";

type ChatPromptProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
};

export function ChatPrompt({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder = "Describe your business and the website you need…",
}: ChatPromptProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <label className="sr-only" htmlFor="site-builder-prompt">
        Describe your website
      </label>
      <textarea
        id="site-builder-prompt"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="min-h-[5rem] flex-1 resize-y rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-stone-900 px-8 py-3.5 text-base font-semibold text-stone-50 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
      >
        {disabled ? "Generating…" : "Generate draft"}
      </button>
    </form>
  );
}
