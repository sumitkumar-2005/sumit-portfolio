import { useEffect, useState } from "react";
import { Code2, Palette, Zap, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Timeline from "@/components/Timeline";
import { education } from "@shared/schema";

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

const PHOTO_KEY = "about-profile-photo";
const DEFAULT_PHOTO =
  "https://placehold.co/600x600/0f172a/94a3b8.png?text=Upload+your+photo";

export default function About() {
  const [photoSrc, setPhotoSrc] = useState<string>(DEFAULT_PHOTO);

  // Load persisted photo from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(PHOTO_KEY);
    if (stored) setPhotoSrc(stored);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16" data-testid="page-about">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-scanlines" />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-neon-cyan/10 text-neon-cyan text-sm font-mono mb-4 border border-neon-cyan/20">
              Fresher Profile
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Aspiring <span className="text-neon-pink">Data Analyst</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground font-mono">
              Pursuing BCA from Arcade Business College
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-6">
              <div className="relative">
                <div
                  className="aspect-square max-w-md mx-auto lg:mx-0 rounded-lg bg-card border border-border/50 overflow-hidden relative group"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.01]"
                    style={{
                      backgroundImage: `url('${photoSrc}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-transparent" />
                </div>

                <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-lg bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center">
                  <span className="font-mono text-neon-pink text-sm text-center leading-tight">
                    Fresher<br />Open to roles
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">
                Hello! I'm <span className="text-neon-cyan">Sumit Kumar</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a fresher and aspiring data analyst, focused on building strong fundamentals
                  in data cleaning, visualization, and storytelling with numbers.
                </p>
                <p>
                  Currently sharpening skills in Python, SQL, spreadsheets, and dashboards while
                  practicing with personal projects and public datasets.
                </p>
                <p>
                  Looking for entry-level or internship opportunities where I can learn fast,
                  contribute, and grow into a well-rounded data professional.
                </p>
                <p className="font-medium text-foreground">
                  Pursuing BCA at <span className="text-neon-pink">Arcade Business College</span>.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {['Python', 'SQL', 'Spreadsheets', 'Data Visualization', 'Storytelling'].map((skill) => (
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
