import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <div className="relative text-center px-6 py-12 md:py-24">
      <h1 className="text-display font-bold text-5xl md:text-6xl lg:text-8xl mb-6">
        Listen Together.
      </h1>
      <p className="text-text-secondary text-lg md:text-xl mb-8 max-w-xl mx-auto">
        Create a room, share the code, and everyone hears the same song at the same moment. No account. No install.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <Button onClick={() => {}}>Create a room</Button>
        <Link to="/join" className="text-text-secondary hover:text-text-primary">
          Join with a code ↓
        </Link>
      </div>
    </div>
  );
}