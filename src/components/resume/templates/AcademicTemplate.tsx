'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

const ResumeSection: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={className}>
      <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-primary/30 pb-1 mb-3">{title}</h3>
      {children}
    </section>
  );
  

const AcademicTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  // Assuming 'experience' can be publications for academic resumes
  const publications = experience.filter(exp => exp.company.toLowerCase() === 'publication');
  const professionalExperience = experience.filter(exp => exp.company.toLowerCase() !== 'publication');

  return (
    <Card className="w-full max-w-[8.5in] min-h-[11in] mx-auto shadow-2xl bg-background font-serif border-0">
      <CardContent className="p-10 text-foreground text-sm leading-relaxed">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">{personalInfo.name}</h1>
          <p className="text-md">{personalInfo.title}</p>
          <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-3 text-xs">
            <span>{personalInfo.email}</span> | 
            <span>{personalInfo.phone}</span> |
            <a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a>
          </div>
        </header>

        <div className="space-y-6">
          {summary && (
            <ResumeSection title="Research Statement">
              <p>{summary}</p>
            </ResumeSection>
          )}
          
          {education?.length > 0 && (
            <ResumeSection title="Education">
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-semibold">{edu.degree}, {edu.graduationYear}</h4>
                    <p>{edu.school}, {edu.location}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}

          {publications.length > 0 && (
            <ResumeSection title="Publications">
              <ul className="space-y-2 list-disc pl-5">
                {publications.map((pub) => (
                  <li key={pub.id}>
                    <span className="font-semibold">{pub.jobTitle}</span> ({pub.endDate}). {pub.description}
                  </li>
                ))}
              </ul>
            </ResumeSection>
          )}

          {professionalExperience.length > 0 && (
            <ResumeSection title="Professional Experience">
              <div className="space-y-4">
                {professionalExperience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-semibold">{exp.jobTitle}, {exp.company}</h4>
                      <p className="text-xs">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-xs">{exp.location}</p>
                    <div className="whitespace-pre-wrap mt-1">{exp.description}</div>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}
          
          {projects?.length > 0 && (
            <ResumeSection title="Research Projects">
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h4 className="font-semibold">{proj.name}</h4>
                    <p>{proj.description}</p>
                  </div>
                ))}
              </div>
            </ResumeSection>
          )}

          {skills?.length > 0 && (
            <ResumeSection title="Skills">
                <ul className="list-none space-y-1">
                    {skills.map((skill, index) => (
                        <li key={index} className="text-sm font-body">{skill}</li>
                    ))}
                </ul>
            </ResumeSection>
          )}

        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicTemplate;
