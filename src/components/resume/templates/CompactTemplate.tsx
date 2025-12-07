'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={className}>
      <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 mb-2">{title}</h3>
      {children}
    </section>
  );
  

const CompactTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] min-h-[11in] mx-auto shadow-2xl bg-background font-sans">
      <CardContent className="p-6 sm:p-8 text-foreground text-[10pt] leading-snug">
        <header className="text-center mb-4">
          <h1 className="text-3xl font-bold text-primary tracking-tight">{personalInfo.name}</h1>
          <h2 className="text-md text-muted-foreground font-medium">{personalInfo.title}</h2>
          <div className="flex justify-center items-center flex-wrap gap-x-3 gap-y-1 mt-2 text-xs">
            {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
            {personalInfo.phone && <> <Separator orientation="vertical" className="h-3" /> <span>{personalInfo.phone}</span> </>}
            {personalInfo.linkedin && <> <Separator orientation="vertical" className="h-3" /> <a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a> </>}
            {personalInfo.github && <> <Separator orientation="vertical" className="h-3" /> <a href={`//${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.github}</a></>}
          </div>
        </header>

        <div className="space-y-4">
          {summary && (
            <ResumeSection title="Summary">
              <p>{summary}</p>
            </ResumeSection>
          )}

          {skills?.length > 0 && (
             <ResumeSection title="Core Competencies">
                <p className="font-medium">
                    {skills.join(' | ')}
                </p>
            </ResumeSection>
          )}

          {experience?.length > 0 && (
            <ResumeSection title="Experience">
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm text-primary">{exp.jobTitle}</h4>
                      <p className="text-xs font-mono">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-xs font-semibold">{exp.company}, {exp.location}</p>
                    <div className="whitespace-pre-wrap mt-1 text-xs">{exp.description}</div>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}
          
          {projects?.length > 0 && (
            <ResumeSection title="Projects">
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-bold text-sm text-primary">{proj.name}</h4>
                      {proj.link && <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline text-accent">{proj.link}</a>}
                    </div>
                    <p className="text-xs mt-0.5">{proj.description}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}

          {education?.length > 0 && (
            <ResumeSection title="Education">
                <div className="space-y-1">
                    {education.map((edu) => (
                      <div key={edu.id} className="flex justify-between">
                        <div>
                            <h4 className="font-bold text-sm">{edu.degree}</h4>
                            <p className="text-xs">{edu.school}, {edu.location}</p>
                        </div>
                        <p className="text-xs font-mono">{edu.graduationYear}</p>
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

export default CompactTemplate;
