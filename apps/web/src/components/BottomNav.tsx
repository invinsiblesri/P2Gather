import { useLocation, useNavigate } from 'react-router-dom';
import { Compass, Search, LayoutGrid, Users, Menu } from 'lucide-react';
import { cn } from '../utils/cn';

const tabs = [
  { path: '/home', label: 'Home', icon: Compass },
  { path: '/search', label: 'Search', icon: Search },
  { path: '/library', label: 'Library', icon: LayoutGrid },
  { path: '/room', label: 'Room', icon: Users },
  { path: '/more', label: 'More', icon: Menu },
] as const;

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/room') return location.pathname.startsWith('/r/');
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-ink-950/95 backdrop-blur-xl border-t border-edge">
      <div className="flex h-full items-center justify-around max-w-lg mx-auto px-2">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = isActive(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors',
                active ? 'text-electric' : 'text-bone-500 hover:text-bone-300'
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.2 : 1.6} />
              <span className="font-mono text-[10px] tracking-wider leading-none">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
