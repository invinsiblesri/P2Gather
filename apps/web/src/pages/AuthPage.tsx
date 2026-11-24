import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, User } from '../stores/authStore';
import { Eye, EyeOff } from 'lucide-react';

type Tab = 'login' | 'signup';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function generateAvatar(name: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0066FF`;
}

export function AuthPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [tab, setTab] = useState<Tab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const storedRaw = localStorage.getItem('p2gather-users');
    const users: Record<string, { user: User; password: string }> =
      storedRaw ? JSON.parse(storedRaw) : {};

    const record = users[email.toLowerCase()];
    if (!record) {
      setError('No account found with this email');
      return;
    }
    if (record.password !== password) {
      setError('Incorrect password');
      return;
    }

    login(record.user);
    navigate(record.user ? '/home' : '/onboarding');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!displayName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const storedRaw = localStorage.getItem('p2gather-users');
    const users: Record<string, { user: User; password: string }> =
      storedRaw ? JSON.parse(storedRaw) : {};

    if (users[email.toLowerCase()]) {
      setError('An account with this email already exists');
      return;
    }

    const user: User = {
      id: generateId(),
      displayName,
      email: email.toLowerCase(),
      avatar: generateAvatar(displayName),
      provider: 'email',
    };

    users[email.toLowerCase()] = { user, password };
    localStorage.setItem('p2gather-users', JSON.stringify(users));

    login(user);
    navigate('/onboarding');
  };

  const handleGoogle = () => {
    const user: User = {
      id: generateId(),
      displayName: 'Music Lover',
      email: 'user@gmail.com',
      avatar: generateAvatar('Music Lover'),
      provider: 'google',
    };
    login(user);
    navigate('/onboarding');
  };

  const handleGuest = () => {
    navigate('/');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-bone-50">
      {/* Background mesh */}
      <div className="mesh-bg" />
      <div className="noise-veil" />

      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="/images/logo.jpg"
            alt="P2Gather"
            className="h-16 w-16 rounded-2xl shadow-lg shadow-electric/20"
          />
          <div className="text-center">
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              P2Gather
            </h1>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-500">
              Listen Together
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="spot border border-edge rounded-spot bg-ink-900/80 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-edge mb-6">
            <button
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 pb-3 font-display text-sm font-medium tracking-tight transition-colors relative ${
                tab === 'login' ? 'text-bone-50' : 'text-bone-500 hover:text-bone-300'
              }`}
            >
              Login
              {tab === 'login' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric" />
              )}
            </button>
            <button
              onClick={() => { setTab('signup'); setError(''); }}
              className={`flex-1 pb-3 font-display text-sm font-medium tracking-tight transition-colors relative ${
                tab === 'signup' ? 'text-bone-50' : 'text-bone-500 hover:text-bone-300'
              }`}
            >
              Sign Up
              {tab === 'signup' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-electric" />
              )}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 border border-hot/30 bg-hot/10 rounded-lg px-4 py-2.5 text-sm text-hot">
              {error}
            </div>
          )}

          {/* Login Form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-edge bg-ink-950/80 rounded-lg px-4 py-3 text-sm text-bone-50 placeholder:text-bone-500 focus:outline-none focus:border-electric/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-edge bg-ink-950/80 rounded-lg px-4 py-3 text-sm text-bone-50 placeholder:text-bone-500 focus:outline-none focus:border-electric/50 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-bone-500 hover:text-bone-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="btn-solid w-full text-sm py-3.5"
              >
                Login
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {tab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400 mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-edge bg-ink-950/80 rounded-lg px-4 py-3 text-sm text-bone-50 placeholder:text-bone-500 focus:outline-none focus:border-electric/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-edge bg-ink-950/80 rounded-lg px-4 py-3 text-sm text-bone-50 placeholder:text-bone-500 focus:outline-none focus:border-electric/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-edge bg-ink-950/80 rounded-lg px-4 py-3 text-sm text-bone-50 placeholder:text-bone-500 focus:outline-none focus:border-electric/50 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-bone-500 hover:text-bone-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-[0.14em] text-bone-400 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-edge bg-ink-950/80 rounded-lg px-4 py-3 text-sm text-bone-50 placeholder:text-bone-500 focus:outline-none focus:border-electric/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="btn-solid w-full text-sm py-3.5"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-edge" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-500">
              or
            </span>
            <div className="flex-1 h-px bg-edge" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-edge bg-ink-950/60 hover:bg-ink-850 rounded-lg px-4 py-3 text-sm font-medium text-bone-50 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84Z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Guest */}
        <div className="text-center">
          <button
            onClick={handleGuest}
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-bone-400 hover:text-bone-50 transition-colors hot-link"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
