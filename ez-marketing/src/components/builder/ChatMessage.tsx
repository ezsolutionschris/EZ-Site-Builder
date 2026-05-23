type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
      role="listitem"
    >
      <div
        className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[85%] sm:text-base ${
          isUser
            ? "bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900"
            : "border border-stone-200 bg-white text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
