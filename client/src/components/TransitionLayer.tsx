import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'wouter';

interface TransitionLayerProps {
  children: React.ReactNode;
}

type TransitionPhase = 'idle' | 'exiting' | 'entering';

export default function TransitionLayer({ children }: TransitionLayerProps) {
  const [location] = useLocation();
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [displayLocation, setDisplayLocation] = useState(location);
  const cachedChildrenRef = useRef<React.ReactNode>(children);
  const pendingChildrenRef = useRef<React.ReactNode>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      cachedChildrenRef.current = children;
      return;
    }

    if (location !== displayLocation && phase === 'idle') {
      pendingChildrenRef.current = children;
      setPhase('exiting');
      
      const exitDuration = 250;
      const enterDelay = 50;
      
      const exitTimeout = setTimeout(() => {
        setDisplayLocation(location);
        cachedChildrenRef.current = pendingChildrenRef.current;
        pendingChildrenRef.current = null;
        setPhase('entering');
        
        const enterTimeout = setTimeout(() => {
          setPhase('idle');
        }, enterDelay);
        
        return () => clearTimeout(enterTimeout);
      }, exitDuration);

      return () => clearTimeout(exitTimeout);
    } else if (location === displayLocation && phase === 'idle') {
      cachedChildrenRef.current = children;
    }
  }, [location, displayLocation, phase, children]);

  const showOverlay = phase === 'exiting' || phase === 'entering';
  const contentOpacity = phase === 'exiting' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0';
  
  const displayedChildren = phase === 'exiting' 
    ? cachedChildrenRef.current 
    : (phase === 'entering' ? cachedChildrenRef.current : children);

  return (
    <div className="relative flex-1 flex flex-col">
      <div 
        className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-250 ease-out ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: showOverlay ? 'translateX(0)' : 'translateX(100%)',
          transitionDuration: '250ms',
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 via-neon-cyan/30 to-neon-lime/20" />
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
        
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-pink via-neon-cyan to-neon-lime animate-pulse" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-neon-cyan animate-bounce-subtle"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className={`flex-1 flex flex-col transition-all duration-200 ease-out ${contentOpacity}`}
      >
        {displayedChildren}
      </div>
    </div>
  );
}
