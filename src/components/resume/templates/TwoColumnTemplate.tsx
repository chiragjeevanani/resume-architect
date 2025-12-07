'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactIcons } from '@/components/resume/icons';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
  <section className={className}>
    <h3 className="font-headline text-lg uppercase font-bold text-primary tracking-wider mb-2">{title}</h3>
    <div className="border-t-2 border-primary/20 w-full mb-4"></div>
    {children}
  </section>
);

const TwoColumnTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] min-h-[11in] mx-auto shadow-2xl bg-background">
      <CardContent className="p-8 text-foreground">
        <header className="text-left mb-8">
          <h1 className="font-headline text-4xl font-bold text-primary">{personalInfo.name}</h1>
          <h2 className="font-body text-lg text-muted-foreground mt-1">{personalInfo.title}</h2>
        </header>

        <div className="grid grid-cols-3 gap-x-8">
            <div className="col-span-1 space-y-6">
                <section>
                    <h3 className="font-headline text-lg uppercase font-bold text-primary tracking-wider mb-2">Contact</h3>
                    <div className="border-t-2 border-primary/20 w-full mb-4"></div>
                    <div className="space-y-2 text-sm">
                        {personalInfo.email && <div className="flex items-start gap-2"><ContactIcons.email className="w-4 h-4 text-primary mt-1 shrink-0" /><span>{personalInfo.email}</span></div>}
                        {personalInfo.phone && <div className="flex items-start gap-2"><ContactIcons.phone className="w-4 h-4 text-primary mt-1 shrink-0" /><span>{personalInfo.phone}</span></div>}
                        {personalInfo.linkedin && <div className="flex items-start gap-2"><ContactIcons.linkedin className="w-4 h-4 text-primary mt-1 shrink-0" /><a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{personalInfo.linkedin}</a></div>}
                        {personalInfo.github && <div className="flex items-start gap-2"><ContactIcons.github className="w-4 h-4 text-primary mt-1 shrink-0" /><a href={`//${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{personalInfo.github}</a></div>}
                    </div>
                </section>

                {education?.length > 0 && (
                    <ResumeSection title="Education">
                    <div className="space-y-4">
                        {education.map((edu) => (
                        <div key={edu.id}>
                            <h4 className="font-bold text-sm">{edu.degree}</h4>
                            <p className="text-sm">{edu.school}</p>
                            <p className="text-xs text-muted-foreground">{edu.location}</p>
                            <p className="text-xs text-muted-foreground">{edu.graduationYear}</p>
                        </div>
                        ))}
                    </div>
                    </ResumeSection>
                )}

                {skills?.length > 0 && (
                    <ResumeSection title="Skills">
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                    </ResumeSection>
                )}
            </div>

            <div className="col-span-2 space-y-6">
                {summary && (
                    <ResumeSection title="Summary">
                    <p className="font-body text-sm leading-relaxed">{summary}</p>
                    </ResumeSection>
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
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TwoColumnTemplate;
