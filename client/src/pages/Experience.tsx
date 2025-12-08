import { Briefcase, Award, Coffee, Code } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Timeline from '@/components/Timeline';
import { experiences } from '@shared/schema';

const stats = [
  { icon: Briefcase, value: '5+', label: 'Years Experience', color: 'text-neon-pink' },
  { icon: Code, value: '50+', label: 'Projects Delivered', color: 'text-neon-cyan' },
  { icon: Award, value: '15+', label: 'Certifications', color: 'text-neon-lime' },
  { icon: Coffee, value: '∞', label: 'Cups of Coffee', color: 'text-neon-pink' },
];

export default function Experience() {
  return (
    <div className="min-h-screen pt-20 pb-16" data-testid="page-experience">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-scanlines" />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-neon-lime/10 text-neon-lime text-sm font-mono mb-4 border border-neon-lime/20">
              Career Path
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Work <span className="text-neon-pink">Experience</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional journey through the tech industry,
              building products that make a difference.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="bg-card/50 border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 md:p-6 text-center">
                  <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-3`} />
                  <div className={`text-2xl md:text-3xl font-bold font-mono ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <Timeline items={experiences} type="experience" />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Companies I've Worked With
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by startups and enterprises alike
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['TechCorp', 'StartupX', 'Digital Agency', 'Innovation Labs', 'Cloud Systems'].map((company, index) => (
              <div
                key={company}
                className="px-6 py-3 rounded-lg bg-secondary/30 text-muted-foreground font-mono text-sm animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Key Achievements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Highlights from my professional career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Led Frontend Architecture',
                description: 'Designed and implemented component library used by 5 product teams, reducing development time by 40%.',
                color: 'border-neon-pink/30',
              },
              {
                title: 'Performance Optimization',
                description: 'Reduced application bundle size by 60% and improved load times from 4s to under 1s.',
                color: 'border-neon-cyan/30',
              },
              {
                title: 'Team Leadership',
                description: 'Mentored 8 junior developers and established coding standards and best practices.',
                color: 'border-neon-lime/30',
              },
              {
                title: 'Open Source Contributions',
                description: 'Contributed to major open-source projects with 500+ stars on personal repositories.',
                color: 'border-neon-pink/30',
              },
            ].map((achievement, index) => (
              <Card
                key={achievement.title}
                className={`bg-card/50 border ${achievement.color} animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-neon-pink/10 via-neon-cyan/10 to-neon-lime/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Looking for a Dedicated Developer?
          </h2>
          <p className="text-muted-foreground mb-8">
            I'm always open to discussing new opportunities and exciting projects.
            Let's connect and see how we can work together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-neon-cyan text-black font-medium transition-all hover:shadow-neon-cyan"
              data-testid="link-linkedin"
            >
              Connect on LinkedIn
            </a>
            <a
              href="/contact"
              className="px-6 py-3 rounded-lg border border-neon-pink text-neon-pink font-medium transition-all hover:bg-neon-pink/10"
              data-testid="link-contact-page"
            >
              Send a Message
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
