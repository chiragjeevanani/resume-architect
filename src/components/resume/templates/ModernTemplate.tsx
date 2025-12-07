'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactIcons } from '@/components/resume/icons';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section className={className}>
    <h3 className="font-headline text-sm uppercase font-bold text-primary tracking-widest pb-1 border-b-2 border-primary">{title}</h3>
    <div className="mt-4">
        {children}
    </div>
  </section>
);

const ModernTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] min-h-[11in] mx-auto shadow-2xl bg-background">
      <CardContent className="p-10 text-foreground">
        <header className="mb-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-headline text-4xl font-bold text-primary">{personalInfo.name}</h1>
              <h2 className="font-body text-lg text-muted-foreground mt-1">{personalInfo.title}</h2>
            </div>
            <div className="text-right text-xs space-y-1">
                {personalInfo.email && <div className="flex items-center justify-end gap-2"><a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a><ContactIcons.email className="w-4 h-4 text-primary" /></div>}
                {personalInfo.phone && <div className="flex items-center justify-end gap-2"><span>{personalInfo.phone}</span><ContactIcons.phone className="w-4 h-4 text-primary" /></div>}
                {personalInfo.linkedin && <div className="flex items-center justify-end gap-2"><a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a><ContactIcons.linkedin className="w-4 h-4 text-primary" /></div>}
                {personalInfo.github && <div className="flex items-center justify-end gap-2"><a href={`//${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.github}</a><ContactIcons.github className="w-4 h-4 text-primary" /></div>}
            </div>
          </div>
        </header>

        <div className="space-y-8">
          {summary && (
            <p className="font-body text-sm leading-relaxed text-center italic">{summary}</p>
          )}

          {skills?.length > 0 && (
             <div className="flex flex-wrap justify-center gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="font-medium">{skill}</Badge>
                ))}
              </div>
          )}

          {experience?.length > 0 && (
            <ResumeSection title="Experience">
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-base text-primary">{exp.jobTitle}</h4>
                      <p className="text-xs text-muted-foreground font-medium">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-sm font-semibold">{exp.company} &bull; {exp.location}</p>
                    <div className="font-body text-sm mt-2 leading-relaxed whitespace-pre-wrap">{exp.description}</div>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}
          
          {projects?.length > 0 && (
            <ResumeSection title="Projects">
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-bold text-base text-primary">{proj.name}</h4>
                      {proj.link && <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">{proj.link}</a>}
                    </div>
                    <p className="font-body text-sm mt-1 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}

          {education?.length > 0 && (
            <ResumeSection title="Education">
                <div className="grid grid-cols-2 gap-4">
                    {education.map((edu) => (
                      <div key={edu.id}>
                        <h4 className="font-bold text-sm">{edu.school}</h4>
                        <p className="text-sm">{edu.degree}</p>
                        <p className="text-xs text-muted-foreground">{edu.location} &bull; {edu.graduationYear}</p>
                      </div>
                    ))}
                </div>
            </ResumeSection>
          )}

        </div>
      </CardContent>
    </Card>
  );
};

export default ModernTemplate;
