import { Code2, Palette, Zap, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Timeline from '@/components/Timeline';
import { education } from '@shared/schema';

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code that stands the test of time.',
    color: 'text-neon-pink',
    bg: 'bg-neon-pink/10',
  },
  {
    icon: Palette,
    title: 'Design Focus',
    description: 'Pixel-perfect implementations with attention to every detail.',
    color: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimized applications that load fast and run smoothly.',
    color: 'text-neon-lime',
    bg: 'bg-neon-lime/10',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Genuine love for technology and continuous learning.',
    color: 'text-neon-pink',
    bg: 'bg-neon-pink/10',
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-16" data-testid="page-about">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-scanlines" />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-neon-cyan/10 text-neon-cyan text-sm font-mono mb-4 border border-neon-cyan/20">
              About Me
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Passionate Developer &{' '}
              <span className="text-neon-pink">Creative Thinker</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-6">
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-lg bg-card border border-border/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-transparent to-neon-cyan/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl font-mono font-bold text-neon-pink/20">S</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-lg bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center">
                  <span className="font-mono text-neon-pink text-lg">5+ yrs</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Hello! I'm <span className="text-neon-cyan">Sumit</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a full-stack developer with over 5 years of experience building
                  web applications that combine beautiful design with powerful functionality.
                  My journey in tech started with a curiosity about how things work on the web,
                  and it's evolved into a passion for creating immersive digital experiences.
                </p>
                <p>
                  I specialize in React, TypeScript, and Node.js, but I'm always exploring
                  new technologies. Recently, I've been diving deep into 3D web graphics
                  with Three.js and WebGL to push the boundaries of what's possible in the browser.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new design trends,
                  contributing to open-source projects, or experimenting with generative art.
                  I believe that the best products come from the intersection of technology
                  and creativity.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {['React', 'TypeScript', 'Node.js', 'Three.js', 'PostgreSQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-md bg-secondary/50 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What I Bring</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Core values and principles that guide my work
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card
                key={item.title}
                className="bg-card/50 border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center mb-4`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-neon-lime/10 text-neon-lime text-sm font-mono mb-4 border border-neon-lime/20">
              Education
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Academic Background
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My educational journey that shaped my technical foundation
            </p>
          </div>

          <Timeline items={education} type="education" />
        </div>
      </section>
    </div>
  );
}
