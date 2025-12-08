import { Link } from 'wouter';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero3D from '@/components/Hero3D';

export default function Home() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="relative" data-testid="page-home">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Hero3D className="w-full h-full" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-scanlines" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-neon-pink/10 text-neon-pink text-sm font-mono mb-6 border border-neon-pink/20">
              Full Stack Developer
            </span>
          </div>

          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-neon-pink drop-shadow-[0_0_20px_rgba(255,0,200,0.5)]">
              Sumit
            </span>
            <br />
            <span className="text-foreground">I build </span>
            <span className="text-neon-cyan drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]">
              digital experiences
            </span>
          </h1>

          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{ animationDelay: '600ms' }}
          >
            Crafting immersive web applications with modern technologies,
            creative 3D graphics, and pixel-perfect attention to detail.
          </p>

          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
            style={{ animationDelay: '800ms' }}
          >
            <Link href="/projects">
              <Button size="lg" className="shadow-neon group" data-testid="button-view-projects">
                View Projects
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-get-in-touch">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-neon-cyan transition-colors animate-bounce-subtle"
          aria-label="Scroll to content"
          data-testid="button-scroll-down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '5+',
                label: 'Years Experience',
                color: 'text-neon-pink',
              },
              {
                number: '50+',
                label: 'Projects Completed',
                color: 'text-neon-cyan',
              },
              {
                number: '20+',
                label: 'Happy Clients',
                color: 'text-neon-lime',
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-8 rounded-lg bg-card/50 border border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`text-4xl md:text-5xl font-bold font-mono ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to bring your ideas to life?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            I'm always excited to work on new projects and collaborate with
            creative minds. Let's create something amazing together.
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-start-project">
              Start a Project
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
