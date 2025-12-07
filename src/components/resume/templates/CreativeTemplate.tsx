'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ContactIcons } from '@/components/resume/icons';

const CreativeTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] min-h-[11in] mx-auto shadow-2xl bg-background font-serif">
      <CardContent className="p-10 text-foreground">
        <header className="relative text-center mb-8 pb-4 border-b-4 border-primary">
          <h1 className="text-5xl font-bold text-primary tracking-wider">{personalInfo.name}</h1>
          <h2 className="text-xl text-muted-foreground mt-2">{personalInfo.title}</h2>
        </header>

        <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mb-8 text-sm">
            {personalInfo.email && <div className="flex items-center gap-2"><ContactIcons.email className="w-4 h-4 text-primary" /><span>{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><ContactIcons.phone className="w-4 h-4 text-primary" /><span>{personalInfo.phone}</span></div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2"><ContactIcons.linkedin className="w-4 h-4 text-primary" /><a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a></div>}
            {personalInfo.github && <div className="flex items-center gap-2"><ContactIcons.github className="w-4 h-4 text-primary" /><a href={`//${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.github}</a></div>}
        </div>

        <div className="space-y-8">
          {summary && (
            <section>
              <p className="text-center text-sm leading-relaxed">{summary}</p>
            </section>
          )}

          {experience?.length > 0 && (
            <section>
              <h3 className="font-headline text-2xl font-bold text-primary mb-4 text-center">Experience</h3>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="pl-4 border-l-2 border-primary/30">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-lg">{exp.jobTitle}</h4>
                      <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="text-md font-semibold text-primary">{exp.company} &bull; {exp.location}</p>
                    <div className="text-sm mt-2 whitespace-pre-wrap">{exp.description}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education?.length > 0 && (
              <section>
                <h3 className="font-headline text-2xl font-bold text-primary mb-4 text-center">Education</h3>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-center">
                      <h4 className="font-bold text-md">{edu.degree}</h4>
                      <p className="text-sm text-primary">{edu.school}</p>
                      <p className="text-xs text-muted-foreground">{edu.location} ({edu.graduationYear})</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {skills?.length > 0 && (
              <section>
                <h3 className="font-headline text-2xl font-bold text-primary mb-4 text-center">Skills</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-sm">{skill}</Badge>
                  ))}
                </div>
              </section>
            )}
          </div>

          {projects?.length > 0 && (
             <section>
                <h3 className="font-headline text-2xl font-bold text-primary mb-4 text-center">Projects</h3>
                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="text-center">
                      <h4 className="font-bold text-lg">{proj.name}</h4>
                      {proj.link && <a href={`//${proj.link}`} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">{proj.link}</a>}
                      <p className="text-sm mt-1">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreativeTemplate;
