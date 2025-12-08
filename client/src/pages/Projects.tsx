import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@shared/schema';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'other', label: 'Other' },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <div className="min-h-screen pt-20 pb-16" data-testid="page-projects">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-scanlines" />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-neon-cyan/10 text-neon-cyan text-sm font-mono mb-4 border border-neon-cyan/20">
              Portfolio
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Featured <span className="text-neon-pink">Projects</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects I've worked on, ranging from web applications
              to interactive 3D experiences and AI-powered tools.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 border-border/50 focus:border-neon-cyan"
                data-testid="input-search-projects"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground self-center mr-2 hidden md:block" />
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'ghost'}
                  size="sm"
                  className={
                    activeCategory === category.id
                      ? 'shadow-neon'
                      : 'text-muted-foreground hover:text-foreground'
                  }
                  onClick={() => setActiveCategory(category.id)}
                  data-testid={`button-filter-${category.id}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {featuredProjects.length > 0 && (
            <div className="mb-16">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
                Featured
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>
          )}

          {otherProjects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                Other Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {otherProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 opacity-20">:(</div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-muted-foreground mb-8">
            I'm always interested in hearing about new projects and opportunities.
            Whether you have a specific idea or just want to explore possibilities,
            let's talk!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neon-pink text-black font-medium transition-all hover:shadow-neon"
            data-testid="link-start-project"
          >
            Start a Project
          </a>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Technologies I Work With
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The tools and technologies that power my projects
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {[
              'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
              'Three.js', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS',
              'TensorFlow', 'GraphQL', 'Tailwind CSS', 'Prisma'
            ].map((tech, index) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-secondary/50 text-muted-foreground text-sm font-medium animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
