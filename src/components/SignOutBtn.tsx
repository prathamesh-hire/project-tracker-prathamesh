'use client';

import { supabaseBrowser } from '@/lib/supabase-browser';

export function SignOutBtn() {
  return (
    <button
      className="btn-secondary text-sm"
      onClick={async () => {
        await supabaseBrowser().auth.signOut();
        location.href = '/sign-in';
      }}
    >
      Sign out
    </button>
  );
}
