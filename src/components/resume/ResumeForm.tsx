'use client';

import React, { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { ResumeData } from '@/lib/types';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import { SectionIcons } from './icons';
import { Form } from '@/components/ui/form';

interface ResumeFormProps {
  form: UseFormReturn<ResumeData>;
  setResumeData: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ form, setResumeData }) => {
  const watchedData = form.watch();

  useEffect(() => {
    const subscription = form.watch((value) => {
      setResumeData(value as ResumeData);
    });
    return () => subscription.unsubscribe();
  }, [form, setResumeData]);

  const sections = [
    { name: 'Personal Info', component: <PersonalInfoForm control={form.control} />, icon: SectionIcons.summary },
    { name: 'Summary', component: <SummaryForm control={form.control} />, icon: SectionIcons.summary },
    { name: 'Experience', component: <ExperienceForm control={form.control} register={form.register} />, icon: SectionIcons.experience },
    { name: 'Education', component: <EducationForm control={form.control} register={form.register} />, icon: SectionIcons.education },
    { name: 'Skills', component: <SkillsForm control={form.control} />, icon: SectionIcons.skills },
    { name: 'Projects', component: <ProjectsForm control={form.control} register={form.register} />, icon: SectionIcons.projects },
  ];

  return (
    <Form {...form}>
      <Accordion type="multiple" defaultValue={['Personal Info']} className="w-full">
        {sections.map(section => (
          <AccordionItem key={section.name} value={section.name}>
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                    <section.icon className="h-5 w-5 text-primary" />
                    {section.name}
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-1">
              {section.component}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Form>
  );
};

export default ResumeForm;
