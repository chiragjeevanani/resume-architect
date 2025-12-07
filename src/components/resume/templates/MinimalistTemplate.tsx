'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={className}>
      <h3 className="text-xs uppercase font-semibold text-muted-foreground tracking-widest mb-3">{title}</h3>
      {children}
    </section>
  );
  

const MinimalistTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] min-h-[11in] mx-auto shadow-2xl bg-background border-0">
      <CardContent className="p-12 text-foreground text-sm leading-normal">
        <header className="mb-10">
          <h1 className="text-4xl font-light tracking-tight text-primary">{personalInfo.name}</h1>
          <h2 className="text-lg font-light text-muted-foreground">{personalInfo.title}</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-xs text-muted-foreground">
            {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:text-primary">{personalInfo.email}</a>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.linkedin && <a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{personalInfo.linkedin}</a>}
            {personalInfo.github && <a href={`//${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">{personalInfo.github}</a>}
          </div>
        </header>

        <div className="space-y-8">
          {summary && (
              <p>{summary}</p>
          )}

          {experience?.length > 0 && (
            <ResumeSection title="Experience">
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-base">{exp.jobTitle} at {exp.company}</h4>
                      <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{exp.location}</p>
                    <div className="whitespace-pre-wrap mt-2 text-sm">{exp.description}</div>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}
          
          <div className="grid grid-cols-3 gap-8">
            {education?.length > 0 && (
                <ResumeSection title="Education" className="col-span-2">
                    <div className="space-y-3">
                        {education.map((edu) => (
                        <div key={edu.id}>
                            <h4 className="font-semibold">{edu.degree}</h4>
                            <p className="text-sm text-muted-foreground">{edu.school}, {edu.location} ({edu.graduationYear})</p>
                        </div>
                        ))}
                    </div>
                </ResumeSection>
            )}

            {skills?.length > 0 && (
                <ResumeSection title="Skills">
                    <ul className="space-y-1">
                        {skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </ResumeSection>
            )}
          </div>

          {projects?.length > 0 && (
            <ResumeSection title="Projects">
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-semibold">{proj.name}</h4>
                      {proj.link && <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline text-muted-foreground">{proj.link}</a>}
                    </div>
                    <p className="text-sm mt-0.5">{proj.description}</p>
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

export default MinimalistTemplate;
