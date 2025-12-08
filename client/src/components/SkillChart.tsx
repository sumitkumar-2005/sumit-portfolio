import { useEffect, useState, useRef } from 'react';
import type { Skill } from '@shared/schema';

interface SkillChartProps {
  skill: Skill;
  delay?: number;
}

export default function SkillChart({ skill, delay = 0 }: SkillChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const colorMap = {
    pink: {
      stroke: 'stroke-neon-pink',
      text: 'text-neon-pink',
      glow: 'drop-shadow-[0_0_8px_rgba(255,0,200,0.5)]',
      bg: 'bg-neon-pink/10',
    },
    cyan: {
      stroke: 'stroke-neon-cyan',
      text: 'text-neon-cyan',
      glow: 'drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]',
      bg: 'bg-neon-cyan/10',
    },
    lime: {
      stroke: 'stroke-neon-lime',
      text: 'text-neon-lime',
      glow: 'drop-shadow-[0_0_8px_rgba(168,255,0,0.5)]',
      bg: 'bg-neon-lime/10',
    },
  };

  const colors = colorMap[skill.color];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (animatedLevel / 100) * circumference;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          setAnimatedLevel(skill.level * easeOutQuart);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [isVisible, skill.level, delay]);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center p-4 rounded-lg ${colors.bg} transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      data-testid={`skill-chart-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative w-28 h-28">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-border/30"
          />
          
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className={`${colors.stroke} ${colors.glow} transition-all duration-1000`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-mono text-2xl font-bold ${colors.text}`}>
            {Math.round(animatedLevel)}%
          </span>
        </div>
      </div>
      
      <h3 className="mt-3 font-medium text-foreground text-center">
        {skill.name}
      </h3>
      <span className="text-xs text-muted-foreground capitalize">
        {skill.category}
      </span>
    </div>
  );
}
