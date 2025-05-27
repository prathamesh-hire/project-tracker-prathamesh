'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabaseBrowser().auth.signInWithPassword({
      email,
      password,
    });
    if (error) return setErr(error.message);
    router.push('/');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card mx-auto mt-24 max-w-xs space-y-4 p-6"
    >
      <h1 className="text-xl font-bold">Sign in</h1>

      <input
        className="input w-full"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="input w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {err && <p className="text-sm text-red-500">{err}</p>}

      <button className="btn-primary w-full">Continue</button>

      <p className="text-center text-sm">
        New user? <a href="/sign-up" className="underline">Create account</a>
      </p>
    </form>
  );
}
