
// ez-marketing/src/components/InstantDBProvider.tsx
"use client";

import { db } from "@/lib/instant";

export function InstantDBProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export { db };