'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactIcons } from '@/components/resume/icons';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={className}>
      <h3 className="font-code text-sm uppercase font-bold text-primary tracking-wider mb-2">{title}</h3>
      <div className="border-t border-primary/20 w-full mb-4"></div>
      {children}
    </section>
  );

const TechnicalTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] min-h-[11in] mx-auto shadow-2xl bg-background font-code">
      <CardContent className="p-8 text-foreground text-sm">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-primary">{`> ${personalInfo.name}`}</h1>
          <h2 className="text-lg text-muted-foreground mt-1">{`// ${personalInfo.title}`}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs">
            {personalInfo.email && <div className="flex items-center gap-2"><ContactIcons.email className="w-4 h-4 text-primary" /><span>{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><ContactIcons.phone className="w-4 h-4 text-primary" /><span>{personalInfo.phone}</span></div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2"><ContactIcons.linkedin className="w-4 h-4 text-primary" /><a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a></div>}
            {personalInfo.github && <div className="flex items-center gap-2"><ContactIcons.github className="w-4 h-4 text-primary" /><a href={`//${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.github}</a></div>}
          </div>
        </header>

        <div className="space-y-6">
          {summary && (
            <ResumeSection title="Objective">
              <p className="leading-relaxed">{summary}</p>
            </ResumeSection>
          )}

          {skills?.length > 0 && (
            <ResumeSection title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="default" className="font-code">{skill}</Badge>
                ))}
              </div>
            </ResumeSection>
          )}

          {experience?.length > 0 && (
            <ResumeSection title="Experience">
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-base text-primary">{exp.company}</h4>
                      <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-sm font-semibold">{exp.jobTitle} / {exp.location}</p>
                    <div className="text-sm mt-2 leading-relaxed whitespace-pre-wrap font-body">{exp.description}</div>
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
                      <h4 className="font-bold text-base text-primary">{`> ${proj.name}`}</h4>
                      {proj.link && <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-xs text-accent hover:underline">{`[${proj.link}]`}</a>}
                    </div>
                    <p className="text-sm mt-1 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}

          {education?.length > 0 && (
            <ResumeSection title="Education">
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-sm">{edu.school} ({edu.graduationYear})</h4>
                    <p className="text-sm">{edu.degree} - {edu.location}</p>
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

export default TechnicalTemplate;
