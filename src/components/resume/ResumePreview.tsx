'use client';

import type { ResumeData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ContactIcons, SectionIcons } from '@/components/resume/icons';

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumeSection: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; className?: string }> = ({ title, icon: Icon, children, className }) => (
  <section className={className}>
    <div className="flex items-center gap-3 mb-4">
      <h3 className="font-headline text-lg uppercase font-bold text-primary tracking-wider">{title}</h3>
    </div>
    <div className="border-t-2 border-primary/20 w-full mb-6"></div>
    {children}
  </section>
);

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <Card className="w-full max-w-[8.5in] aspect-[8.5/11] mx-auto shadow-2xl">
      <CardContent className="p-0 text-gray-800">
        <div className="flex flex-col h-full">
          <header className="p-8 text-center bg-background">
            <h1 className="font-headline text-5xl font-bold text-primary">{personalInfo.name}</h1>
            <h2 className="font-body text-xl text-muted-foreground mt-2">{personalInfo.title}</h2>
          </header>

          <div className="flex-grow grid grid-cols-3 gap-8 p-8 bg-background">
            {/* Main Content */}
            <div className="col-span-2 space-y-8">
              <ResumeSection title="Summary" icon={SectionIcons.summary}>
                <p className="font-body text-sm leading-relaxed">{summary}</p>
              </ResumeSection>

              <ResumeSection title="Professional Experience" icon={SectionIcons.experience}>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
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

              <ResumeSection title="Projects" icon={SectionIcons.projects}>
                <div className="space-y-6">
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

            {/* Sidebar */}
            <div className="col-span-1 space-y-8">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-headline text-lg uppercase font-bold text-primary tracking-wider mb-4">Contact</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <ContactIcons.email className="w-4 h-4 text-primary" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ContactIcons.phone className="w-4 h-4 text-primary" />
                    <span>{personalInfo.phone}</span>
                  </div>
                   <div className="flex items-center gap-3">
                    <ContactIcons.linkedin className="w-4 h-4 text-primary" />
                    <a href={`//${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.linkedin}</a>
                  </div>
                   <div className="flex items-center gap-3">
                    <ContactIcons.github className="w-4 h-4 text-primary" />
                    <a href={`//${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.github}</a>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-headline text-lg uppercase font-bold text-primary tracking-wider mb-4">Education</h3>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="font-bold text-sm">{edu.school}</h4>
                      <p className="text-sm">{edu.degree}</p>
                      <p className="text-xs text-muted-foreground">{edu.graduationYear}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-headline text-lg uppercase font-bold text-primary tracking-wider mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="font-medium bg-primary/10 text-primary hover:bg-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
