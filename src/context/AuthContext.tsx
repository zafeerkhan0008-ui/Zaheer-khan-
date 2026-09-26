import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '@/src/utils/apiClient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'customer';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  ownerConfigured: boolean;
  ownerEmail: string | null;
  ownerName: string | null;
  isOwner: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  setupOwner: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('zk_auth_token'));
  const [loading, setLoading] = useState(true);
  const [ownerConfigured, setOwnerConfigured] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string | null>(null);

  const fetchAuthStatus = async () => {
    try {
      const res = await apiFetch<{
        ownerConfigured: boolean;
        ownerEmail?: string | null;
        ownerName?: string | null;
      }>('/api/auth/status');

      if (res.ok && res.data) {
        setOwnerConfigured(!!res.data.ownerConfigured);
        setOwnerEmail(res.data.ownerEmail || null);
        setOwnerName(res.data.ownerName || null);
      }
    } catch (e) {
      console.error('Failed to fetch auth status', e);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await apiFetch<{ user: User }>('/api/auth/me');
      if (res.ok && res.data?.user) {
        setUser(res.data.user);
      } else {
        localStorage.removeItem('zk_auth_token');
        setToken(null);
        setUser(null);
      }
    } catch {
      localStorage.removeItem('zk_auth_token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchAuthStatus();
      if (token) {
        await fetchCurrentUser();
      } else {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiFetch<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (!res.ok || !res.data) {
      return { success: false, error: res.error || 'Login failed' };
    }

    localStorage.setItem('zk_auth_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    await fetchAuthStatus();
    return { success: true };
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await apiFetch<{ token: string; user: User }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok || !res.data) {
      return { success: false, error: res.error || 'Registration failed' };
    }

    localStorage.setItem('zk_auth_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    await fetchAuthStatus();
    return { success: true };
  };

  const setupOwner = async (name: string, email: string, password: string) => {
    const res = await apiFetch<{ token: string; user: User }>('/api/auth/setup-owner', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok || !res.data) {
      return { success: false, error: res.error || 'Owner account initialization failed' };
    }

    localStorage.setItem('zk_auth_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    setOwnerConfigured(true);
    setOwnerEmail(res.data.user.email);
    setOwnerName(res.data.user.name);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('zk_auth_token');
    setToken(null);
    setUser(null);
  };

  const refreshAuth = async () => {
    await fetchAuthStatus();
    if (localStorage.getItem('zk_auth_token')) {
      await fetchCurrentUser();
    }
  };

  const isOwner = user?.role === 'owner';
  const isAdmin = user?.role === 'owner' || user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        ownerConfigured,
        ownerEmail,
        ownerName,
        isOwner,
        isAdmin,
        login,
        register,
        setupOwner,
        logout,
        refreshAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
