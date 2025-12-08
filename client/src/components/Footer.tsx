import { Link } from 'wouter';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/50 bg-card/30" data-testid="footer">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-pink/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link 
              href="/"
              className="font-mono text-xl font-bold tracking-tight inline-block"
            >
              <span className="text-neon-pink">S</span>
              <span className="text-foreground">umit</span>
              <span className="text-neon-cyan">.</span>
              <span className="text-foreground">dev</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Building digital experiences with code, creativity, and a touch of neon.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-sm font-semibold text-neon-cyan uppercase tracking-wider">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (
                <Link 
                  key={link} 
                  href={`/${link.toLowerCase()}`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  data-testid={`link-footer-${link.toLowerCase()}`}
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-sm font-semibold text-neon-cyan uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-md bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-neon-cyan hover:bg-secondary transition-all hover:shadow-neon-cyan"
                  aria-label={label}
                  data-testid={`link-social-${label.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              <a 
                href="mailto:sumit@example.com" 
                className="hover:text-neon-cyan transition-colors"
                data-testid="link-email"
              >
                sumit@example.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 text-neon-pink animate-pulse" /> by Sumit
          </p>
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
