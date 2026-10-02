import { useState, useEffect } from 'react';

export type UserRole = 'customer' | 'meister';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

const KEY = 'meistermatch_auth_v1';

function load(): AuthUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => load());

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user));
      else localStorage.removeItem(KEY);
    } catch { /* ignore */ }
  }, [user]);

  const signUp = (name: string, phone: string, role: UserRole) => {
    const u: AuthUser = { id: `u-${Date.now().toString(36)}`, name: name.trim() || (role === 'meister' ? 'Demo Meister' : 'Demo Customer'), phone: phone.trim() || '+371 20 000 000', role, createdAt: new Date().toISOString() };
    setUser(u);
    return u;
  };

  const signIn = (phone: string, role: UserRole) => {
    const prev = load();
    if (prev && prev.phone === phone.trim()) {
      setUser({ ...prev, role });
      return prev;
    }
    return signUp(prev?.name || 'Demo User', phone, role);
  };

  const signOut = () => setUser(null);

  return { user, signUp, signIn, signOut };
}
