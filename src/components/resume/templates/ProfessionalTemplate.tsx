'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={className}>
      <h3 className="text-base font-semibold uppercase tracking-wider text-primary mb-3">{title}</h3>
      {children}
    </section>
  );
  

const ProfessionalTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] min-h-[11in] mx-auto shadow-2xl bg-background border-0">
      <CardContent className="p-8 text-foreground text-sm">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-primary">{personalInfo.name}</h1>
          <h2 className="text-lg text-muted-foreground font-medium mt-1">{personalInfo.title}</h2>
        </header>

        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-6">
            {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
            {personalInfo.phone && <> <Separator orientation="vertical" className="h-4 mx-2" /> <span>{personalInfo.phone}</span> </>}
            {personalInfo.linkedin && <> <Separator orientation="vertical" className="h-4 mx-2" /> <a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a> </>}
            {personalInfo.github && <> <Separator orientation="vertical" className="h-4 mx-2" /> <a href={`//${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.github}</a></>}
        </div>

        <Separator className="mb-6"/>

        <div className="space-y-6">
          {summary && (
            <section>
              <p className="leading-relaxed">{summary}</p>
            </section>
          )}

          {experience?.length > 0 && (
            <ResumeSection title="Professional Experience">
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-base">{exp.jobTitle}, <span className="font-normal text-primary">{exp.company}</span></h4>
                      <p className="text-xs text-muted-foreground font-medium">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">{exp.location}</p>
                    <div className="font-body text-sm mt-2 leading-relaxed whitespace-pre-wrap">{exp.description}</div>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}
          
          {projects?.length > 0 && (
            <ResumeSection title="Key Projects">
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-bold text-base">{proj.name}</h4>
                      {proj.link && <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">{proj.link}</a>}
                    </div>
                    <p className="font-body text-sm mt-1 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}

            <div className="grid grid-cols-2 gap-x-8">
                {education?.length > 0 && (
                <ResumeSection title="Education">
                    <div className="space-y-4">
                        {education.map((edu) => (
                        <div key={edu.id}>
                            <h4 className="font-bold text-sm">{edu.degree}</h4>
                            <p className="text-sm">{edu.school}</p>
                            <p className="text-xs text-muted-foreground">{edu.location} &bull; {edu.graduationYear}</p>
                        </div>
                        ))}
                    </div>
                </ResumeSection>
                )}

                {skills?.length > 0 && (
                <ResumeSection title="Areas of Expertise">
                    <ul className="list-none space-y-1">
                        {skills.map((skill, index) => (
                        <li key={index} className="text-sm font-body">{skill}</li>
                        ))}
                    </ul>
                </ResumeSection>
                )}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalTemplate;
