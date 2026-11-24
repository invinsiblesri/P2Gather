import { useCallback } from 'react';

export function useSpotlight() {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--sx', `${x}px`);
    e.currentTarget.style.setProperty('--sy', `${y}px`);
  }, []);

  return { onMouseMove };
}
