import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-bg-canvas border-b border-white/10 flex items-center justify-between px-6 py-2">
      <div className="flex items-center space-x-4">
        <Logo className="text-xl" />
        <span className="text-text-primary font-sans">P2GATHER</span>
      </div>
      <div>
        <button className="hamburger" aria-label="Menu" />
        <Link to="/join" className="text-text-secondary hover:text-text-primary">
          Join with a code ↓
        </Link>
      </div>
    </nav>
  );
}