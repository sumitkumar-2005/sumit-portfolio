import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SkillChart from '@/components/SkillChart';
import { skills } from '@shared/schema';

const categories = [
  { id: 'all', label: 'All Skills' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools' },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((skill) => skill.category === activeCategory);

  return (
    <div className="min-h-screen pt-20 pb-16" data-testid="page-skills">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-scanlines" />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-neon-pink/10 text-neon-pink text-sm font-mono mb-4 border border-neon-pink/20">
              My Expertise
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Skills & <span className="text-neon-cyan">Technologies</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and the technologies
              I use to bring ideas to life.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                className={
                  activeCategory === category.id
                    ? 'shadow-neon'
                    : 'border-border/50 hover:border-neon-cyan/50'
                }
                onClick={() => setActiveCategory(category.id)}
                data-testid={`button-filter-${category.id}`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredSkills.map((skill, index) => (
              <SkillChart
                key={skill.name}
                skill={skill}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              My Development Stack
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The core technologies and tools I work with daily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-card/50 border border-border/50">
              <h3 className="font-mono text-neon-pink text-lg mb-4">Frontend</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-pink" />
                  React / Next.js
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-pink" />
                  TypeScript
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-pink" />
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-pink" />
                  Three.js / WebGL
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-card/50 border border-border/50">
              <h3 className="font-mono text-neon-cyan text-lg mb-4">Backend</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                  Node.js / Express
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                  Python / FastAPI
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                  PostgreSQL / MongoDB
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                  GraphQL / REST APIs
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-card/50 border border-border/50">
              <h3 className="font-mono text-neon-lime text-lg mb-4">DevOps & Tools</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-lime" />
                  Docker / Kubernetes
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-lime" />
                  AWS / Vercel
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-lime" />
                  Git / GitHub Actions
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-neon-lime" />
                  Figma / Adobe XD
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Always Learning, Always Growing
          </h2>
          <p className="text-muted-foreground mb-8">
            Technology evolves rapidly, and so do I. I'm constantly exploring new
            frameworks, tools, and methodologies to stay at the forefront of web development.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Rust', 'WebAssembly', 'AI/ML', 'Web3', 'AR/VR'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-dashed border-neon-cyan/30 text-neon-cyan text-sm"
              >
                Currently exploring: {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
