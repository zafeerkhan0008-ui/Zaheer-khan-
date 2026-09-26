import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, Mail, User, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register' | 'owner_setup';
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess
}) => {
  const { login, register, setupOwner, ownerConfigured, ownerEmail } = useAuth();

  // If no owner is configured yet, default directly to owner_setup mode
  const [mode, setMode] = useState<'login' | 'register' | 'owner_setup'>(() =>
    !ownerConfigured ? 'owner_setup' : initialMode
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ownerConfigured) {
      setMode('owner_setup');
    } else if (mode === 'owner_setup') {
      setMode('login');
    }
  }, [ownerConfigured]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'owner_setup' || mode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    if (mode === 'owner_setup') {
      const res = await setupOwner(name.trim(), email.trim(), password);
      setLoading(false);
      if (res.success) {
        onSuccess();
        onClose();
      } else {
        setError(res.error || 'Failed to setup owner account. Please check your details.');
      }
    } else if (mode === 'register') {
      const res = await register(name.trim(), email.trim(), password);
      setLoading(false);
      if (res.success) {
        onSuccess();
        onClose();
      } else {
        setError(res.error || 'Registration failed.');
      }
    } else {
      const res = await login(email.trim(), password);
      setLoading(false);
      if (res.success) {
        onSuccess();
        onClose();
      } else {
        setError(res.error || 'Invalid email or password.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-950 border border-indigo-500/30 text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              ZK Web Studio Security
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            {mode === 'owner_setup'
              ? 'Create My Owner Account'
              : mode === 'login'
              ? 'Owner & Client Login'
              : 'Create Customer Account'}
          </h2>

          <p className="text-xs text-slate-400 leading-relaxed">
            {mode === 'owner_setup'
              ? 'Initialize your Sole Owner / Super Admin account. Enter your real email address, name, and secure password. This setup runs once.'
              : mode === 'login'
              ? 'Log in with your verified owner credentials to access the admin dashboard, or sign in to track your enquiry.'
              : 'Public registration creates customer accounts only. Super Admin rights cannot be self-assigned.'}
          </p>
        </div>

        {/* Notice for Owner Setup */}
        {mode === 'owner_setup' && (
          <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs space-y-1.5">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>One-Time Backend Owner Authorization</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              The first account registered here is granted the immutable <strong>Sole Owner / Super Admin</strong> role on the backend with full website and database management access. After creation, owner registration is permanently disabled.
            </p>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {(mode === 'register' || mode === 'owner_setup') && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {mode === 'owner_setup' ? 'Your Full Name (Owner)' : 'Full Name'} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. ZK or Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {mode === 'owner_setup' ? 'Your Real Email Address *' : 'Email Address *'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="you@yourdomain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            {mode === 'owner_setup' && (
              <p className="text-[10px] text-slate-500 mt-1">
                Enter your genuine personal/business email. This will be your permanent Super Admin login.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {(mode === 'register' || mode === 'owner_setup') && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <span>Saving securely...</span>
            ) : (
              <>
                <span>
                  {mode === 'owner_setup'
                    ? 'Confirm & Create Owner Account'
                    : mode === 'login'
                    ? 'Log In'
                    : 'Create Account'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Mode Switcher Links */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <>
              {!ownerConfigured && (
                <div>
                  First time setting up?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('owner_setup');
                      setError(null);
                    }}
                    className="text-indigo-400 hover:underline font-semibold"
                  >
                    Create My Owner Account
                  </button>
                </div>
              )}
              <div>
                Client with an inquiry?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setError(null);
                  }}
                  className="text-slate-300 hover:underline font-semibold"
                >
                  Register as Customer
                </button>
              </div>
            </>
          ) : mode === 'register' ? (
            <div>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                }}
                className="text-indigo-400 hover:underline font-semibold"
              >
                Log In
              </button>
            </div>
          ) : (
            <div>
              Already set up your account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                }}
                className="text-indigo-400 hover:underline font-semibold"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
