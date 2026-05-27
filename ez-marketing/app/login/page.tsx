'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/instant';
import { site } from '@/lib/site';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [sentEmail, setSentEmail] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 dark:bg-stone-950">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="mb-6 text-center">
          <span className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            {site.productName}
          </span>
        </div>
        <db.SignedIn>
          <AlreadySignedIn />
        </db.SignedIn>
        <db.SignedOut>
          {!sentEmail ? (
            <EmailStep onSendEmail={setSentEmail} />
          ) : (
            <CodeStep sentEmail={sentEmail} onSuccess={() => router.replace('/dashboard')} />
          )}
        </db.SignedOut>
      </div>
    </div>
  );
}

function AlreadySignedIn() {
  return (
    <div className="flex flex-col gap-3 text-center">
      <p className="text-sm text-stone-600 dark:text-stone-400">You're already signed in.</p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700 text-center"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

function EmailStep({ onSendEmail }: { onSendEmail: (email: string) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = inputRef.current!.value;
    onSendEmail(email);
    db.auth.sendMagicCode({ email }).catch((err) => {
      alert('Error: ' + err.body?.message);
      onSendEmail('');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-sm text-stone-500">Sign in or create an account</p>
      <input
        ref={inputRef}
        type="email"
        placeholder="you@example.com"
        required
        autoFocus
        className="rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
      />
      <button
        type="submit"
        className="rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700"
      >
        Send magic code
      </button>
    </form>
  );
}

function CodeStep({ sentEmail, onSuccess }: { sentEmail: string; onSuccess: () => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = inputRef.current!.value;
    db.auth.signInWithMagicCode({ email: sentEmail, code })
      .then(() => onSuccess())
      .catch((err) => {
        inputRef.current!.value = '';
        alert('Invalid code: ' + err.body?.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-sm text-stone-500">
        We sent a code to <strong>{sentEmail}</strong>. Check your email.
      </p>
      <input
        ref={inputRef}
        type="text"
        placeholder="123456"
        required
        autoFocus
        maxLength={6}
        className="rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm tracking-widest text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
      />
      <button
        type="submit"
        className="rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700"
      >
        Verify code
      </button>
    </form>
  );
}