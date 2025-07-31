import type React from 'react';

export interface Achievement {
  text: string;
  links: Record<string, string>;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: Achievement[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  detail: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}
