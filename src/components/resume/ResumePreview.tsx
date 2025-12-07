'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactIcons } from '@/components/resume/icons';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section className={className}>
    <h3 className="font-headline text-lg uppercase font-bold text-primary tracking-wider mb-2">{title}</h3>
    <div className="border-t-2 border-primary/20 w-full mb-4"></div>
    {children}
  </section>
);

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] aspect-[8.5/11] mx-auto shadow-2xl">
      <CardContent className="p-8 text-gray-800 bg-background h-full">
        <header className="text-center mb-8">
          <h1 className="font-headline text-5xl font-bold text-primary">{personalInfo.name}</h1>
          <h2 className="font-body text-xl text-muted-foreground mt-2">{personalInfo.title}</h2>
          <div className="flex justify-center items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ContactIcons.email className="w-4 h-4 text-primary" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <ContactIcons.phone className="w-4 h-4 text-primary" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <ContactIcons.linkedin className="w-4 h-4 text-primary" />
                <a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a>
              </div>
              <div className="flex items-center gap-2">
                <ContactIcons.github className="w-4 h-4 text-primary" />
                <a href={`//${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.github}</a>
              </div>
          </div>
        </header>

        <div className="space-y-6">
          <ResumeSection title="Summary">
            <p className="font-body text-sm leading-relaxed">{summary}</p>
          </ResumeSection>

          <ResumeSection title="Professional Experience">
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-base text-primary">{exp.jobTitle}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <p className="text-sm font-semibold">{exp.company} &bull; {exp.location}</p>
                  <div className="font-body text-sm mt-2 leading-relaxed whitespace-pre-wrap">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </ResumeSection>
          
          <div className="grid grid-cols-2 gap-8">
            <ResumeSection title="Education">
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-sm">{edu.school}</h4>
                    <p className="text-sm">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="font-medium bg-primary/10 text-primary hover:bg-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </ResumeSection>
          </div>

          <ResumeSection title="Projects">
            <div className="space-y-4">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline gap-2">
                    <h4 className="font-bold text-base text-primary">{proj.name}</h4>
                    <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">{proj.link}</a>
                  </div>
                  <p className="font-body text-sm mt-1 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </ResumeSection>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
