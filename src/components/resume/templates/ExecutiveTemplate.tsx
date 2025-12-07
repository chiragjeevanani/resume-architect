'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ContactIcons } from '@/components/resume/icons';
import { Separator } from '@/components/ui/separator';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={className}>
      <h3 className="font-headline text-lg uppercase font-bold text-primary tracking-widest mb-3">{title}</h3>
      <Separator className="bg-primary/30 h-[2px] mb-4"/>
      {children}
    </section>
  );
  

const ExecutiveTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] min-h-[11in] mx-auto shadow-2xl bg-background border-0">
      <CardContent className="p-10 text-foreground text-[11pt] leading-relaxed">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-5xl font-extrabold text-primary tracking-tight">{personalInfo.name}</h1>
          <h2 className="font-body text-xl text-muted-foreground mt-2">{personalInfo.title}</h2>
          <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-4 text-sm">
            {personalInfo.email && <div className="flex items-center gap-2"><ContactIcons.email className="w-4 h-4 text-primary/70" /><span>{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><ContactIcons.phone className="w-4 h-4 text-primary/70" /><span>{personalInfo.phone}</span></div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2"><ContactIcons.linkedin className="w-4 h-4 text-primary/70" /><a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a></div>}
          </div>
        </header>

        <div className="space-y-7">
          {summary && (
            <section>
              <h3 className="text-lg font-semibold text-center mb-4">Executive Summary</h3>
              <p className="text-center">{summary}</p>
            </section>
          )}

          {skills?.length > 0 && (
             <ResumeSection title="Core Competencies">
                <p className="columns-2 sm:columns-3 gap-x-8">
                    {skills.map((skill, index) => <span key={index} className="block">{`\u2022 ${skill}`}</span>)}
                </p>
            </ResumeSection>
          )}

          {experience?.length > 0 && (
            <ResumeSection title="Professional Experience">
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-lg text-primary">{exp.jobTitle}</h4>
                      <p className="text-sm text-muted-foreground font-medium">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-md font-semibold">{exp.company} | {exp.location}</p>
                    <div className="text-sm mt-2 whitespace-pre-wrap">{exp.description}</div>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {projects?.length > 0 && (
                <ResumeSection title="Key Accomplishments">
                <ul className="space-y-2 list-disc pl-5">
                    {projects.map((proj) => (
                    <li key={proj.id}>
                        <span className="font-semibold">{proj.name}:</span> {proj.description}
                    </li>
                    ))}
                </ul>
                </ResumeSection>
            )}

            {education?.length > 0 && (
                <ResumeSection title="Education & Certifications">
                    <div className="space-y-4">
                        {education.map((edu) => (
                        <div key={edu.id}>
                            <h4 className="font-bold text-md">{edu.degree}</h4>
                            <p className="text-sm">{edu.school}</p>
                            <p className="text-xs text-muted-foreground">{edu.graduationYear}</p>
                        </div>
                        ))}
                    </div>
                </ResumeSection>
            )}
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default ExecutiveTemplate;
