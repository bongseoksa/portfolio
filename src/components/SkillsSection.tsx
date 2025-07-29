import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { skills } from '../data/portfolio';

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();
  const { frontend, stateManagement, styling, api, tools } = skills;

  return (
    <section id="skills" className="py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('skills.title')}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('skills.description')}
            </p>
          </div>
        </div>
        <div className="mx-auto flex justify-between flex-wrap max-w-5xl gap-6 py-12">
          {<Skills title="Frontend" skills={frontend} />}
          {<Skills title="State" skills={stateManagement} />}
          {<Skills title="Styling" skills={styling} />}
          {<Skills title="API & Network" skills={api} />}
          {<Skills title="Tools" skills={tools} />}
        </div>
      </div>
    </section>
  );
};

const Skills = function Skills({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="flex flex-col ">
      <p className="text-xl sm:text-2xl xl:text-3xl text-center font-bold">{title}</p>
      <div className="flex flex-col flex-wrap justify-center items-center gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-sm py-2 px-4 w-fit">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
