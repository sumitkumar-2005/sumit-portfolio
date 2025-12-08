import { useEffect, useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import type { Experience, Education } from '@shared/schema';

interface TimelineItemProps {
  item: Experience | Education;
  index: number;
  type: 'experience' | 'education';
}

function TimelineItem({ item, index, type }: TimelineItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const isExperience = type === 'experience';
  const expItem = item as Experience;
  const eduItem = item as Education;

  return (
    <div
      ref={ref}
      className={`relative pl-8 md:pl-0 ${
        index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%]'
      }`}
    >
      <div
        className={`absolute left-0 md:left-1/2 top-0 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-neon-pink bg-background transition-all duration-500 ${
          isVisible ? 'scale-100 shadow-neon' : 'scale-0'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      />

      <div
        className={`absolute left-0 md:left-1/2 top-4 w-px bg-gradient-to-b from-neon-pink to-transparent h-full -translate-x-1/2 transition-opacity duration-500 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
      />

      <div
        className={`p-5 rounded-lg bg-card border border-border/50 transition-all duration-500 hover:border-neon-pink/30 hover:shadow-lg ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}
        style={{ transitionDelay: `${index * 150}ms` }}
        data-testid={`timeline-item-${item.id}`}
      >
        <div className={`flex flex-col gap-2 ${index % 2 === 0 ? 'md:items-end' : ''}`}>
          <span className="text-xs font-mono text-neon-cyan">
            {isExperience ? expItem.duration : eduItem.duration}
          </span>
          
          <h3 className="text-lg font-semibold text-foreground">
            {isExperience ? expItem.role : eduItem.degree}
          </h3>
          
          <p className="text-sm text-neon-pink font-medium">
            {isExperience ? expItem.company : eduItem.institution}
          </p>
          
          <p className="text-sm text-muted-foreground mt-2">
            {isExperience ? expItem.description : eduItem.description}
          </p>

          {isExperience && expItem.technologies && (
            <div className={`flex flex-wrap gap-1.5 mt-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
              {expItem.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TimelineProps {
  items: (Experience | Education)[];
  type: 'experience' | 'education';
}

export default function Timeline({ items, type }: TimelineProps) {
  return (
    <div className="relative" data-testid={`timeline-${type}`}>
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/30 -translate-x-1/2" />
      
      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            type={type}
          />
        ))}
      </div>
    </div>
  );
}
