import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { siGithub } from 'simple-icons';
import { projects } from '../data/portfolio';
import type { Project } from '../types/portfolio';
import SVG from 'react-inlinesvg';

const SimpleIcon = (svgData: string) => {
  const svgDataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`;

  return <SVG src={svgDataUri} width={24} height={24} />;
};

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t('projects.title')}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('projects.description')}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
          {projects.map((project: Project, index: number) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || '/placeholder.svg'}
                  width={300}
                  height={200}
                  alt={project.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.map((tech: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.detail && (
                    <Button size="sm" asChild>
                      <a href={project.detail} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t('projects.detail')}
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        {SimpleIcon(siGithub.svg)}
                        {t('projects.github')}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
