import { useState, useRef } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Project } from '@shared/schema';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  const categoryColors = {
    web: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
    mobile: 'bg-neon-pink/10 text-neon-pink border-neon-pink/20',
    ai: 'bg-neon-lime/10 text-neon-lime border-neon-lime/20',
    other: 'bg-secondary text-secondary-foreground',
  };

  return (
    <>
      <div
        ref={cardRef}
        className="group relative animate-fade-in"
        style={{
          perspective: '1000px',
          animationDelay: `${index * 100}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-testid={`project-card-${project.id}`}
      >
        <div
          className="relative rounded-lg border border-border/50 bg-card overflow-visible transition-all duration-300 ease-out"
          style={{
            transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
            transformStyle: 'preserve-3d',
            boxShadow: isHovered
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 0, 200, 0.15)'
              : 'none',
          }}
        >
          <div
            className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,0,200,0.1) 0%, rgba(0,229,255,0.1) 100%)',
            }}
          />

          <div className="relative aspect-video bg-secondary/50 overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-transparent to-neon-cyan/20" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-mono font-bold text-muted-foreground/30">
                {project.title.charAt(0)}
              </div>
            </div>

            <div
              className={`absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Button
                variant="outline"
                className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
                onClick={() => setIsModalOpen(true)}
                data-testid={`button-view-project-${project.id}`}
              >
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-lg text-foreground line-clamp-1">
                {project.title}
              </h3>
              <Badge className={categoryColors[project.category]}>
                {project.category}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs px-2 py-1 text-muted-foreground">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>

          <div
            className={`absolute -inset-px rounded-lg pointer-events-none transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,0,200,0.3) 0%, rgba(0,229,255,0.3) 50%, rgba(168,255,0,0.3) 100%)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              padding: '1px',
            }}
          />
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-card border-border/50">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-semibold">
                {project.title}
              </DialogTitle>
              <Badge className={categoryColors[project.category]}>
                {project.category}
              </Badge>
            </div>
            <DialogDescription className="text-muted-foreground mt-2">
              {project.longDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="aspect-video bg-secondary/50 rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-transparent to-neon-cyan/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-mono font-bold text-muted-foreground/20">
                  {project.title.charAt(0)}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-mono text-neon-cyan mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-secondary/50"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {project.liveUrl && (
                <Button asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-project-live-${project.id}`}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`link-project-github-${project.id}`}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
