import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { contactFormSchema, type ContactFormData } from '@shared/schema';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sumit@example.com',
    href: 'mailto:sumit@example.com',
    color: 'text-neon-pink',
    bg: 'bg-neon-pink/10',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    color: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: null,
    color: 'text-neon-lime',
    bg: 'bg-neon-lime/10',
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      form.reset();
      toast({
        title: 'Message sent!',
        description: 'Thank you for reaching out. I\'ll get back to you soon.',
      });
      setTimeout(() => setIsSuccess(false), 5000);
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen pt-20 pb-16" data-testid="page-contact">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-scanlines" />

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-neon-lime/10 text-neon-lime text-sm font-mono mb-4 border border-neon-lime/20">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Let's <span className="text-neon-cyan">Connect</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you.
              Drop me a message and I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <Card
                    key={item.label}
                    className="bg-card/50 border-border/50 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium hover:text-neon-cyan transition-colors"
                            data-testid={`link-contact-${item.label.toLowerCase()}`}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="font-medium">{item.value}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-neon-pink/10 via-neon-cyan/10 to-neon-lime/10 border-border/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Availability</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    I'm currently available for freelance work and full-time opportunities.
                    Response time is typically within 24 hours.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
                    <span className="text-sm text-neon-lime">Available for hire</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6 md:p-8">
                  {isSuccess ? (
                    <div className="text-center py-12 animate-fade-in">
                      <div className="w-16 h-16 rounded-full bg-neon-lime/20 flex items-center justify-center mx-auto mb-6">
                        <Check className="h-8 w-8 text-neon-lime" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thank you for reaching out. I'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your name"
                                  className="bg-secondary/30 border-border/50 focus:border-neon-cyan"
                                  data-testid="input-contact-name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your@email.com"
                                  className="bg-secondary/30 border-border/50 focus:border-neon-cyan"
                                  data-testid="input-contact-email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell me about your project or just say hi..."
                                  className="min-h-[150px] bg-secondary/30 border-border/50 focus:border-neon-cyan resize-none"
                                  data-testid="input-contact-message"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full shadow-neon"
                          disabled={contactMutation.isPending}
                          data-testid="button-submit-contact"
                        >
                          {contactMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-muted-foreground mb-8">
            Whether you have a specific project in mind or just want to explore possibilities,
            I'm here to help turn your ideas into reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-secondary/50 text-foreground font-medium transition-all hover:bg-secondary"
              data-testid="link-github"
            >
              View GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-secondary/50 text-foreground font-medium transition-all hover:bg-secondary"
              data-testid="link-linkedin"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
