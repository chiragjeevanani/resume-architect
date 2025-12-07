import { z } from 'zod';

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id:string;
  degree: string;
  school: string;
  location: string;
  graduationYear: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

// AI Flow Types
export const TailorResumeInputSchema = z.object({
  jobRole: z.string().describe("The user's desired job role."),
});
export type TailorResumeInput = z.infer<typeof TailorResumeInputSchema>;

export const TailorResumeOutputSchema = z.object({
  summary: z.string().describe('A professional summary tailored to the job role, written in the first person. Should be around 3-4 sentences.'),
  skills: z.array(z.string()).describe('A list of 8-10 key technical and soft skills relevant to the job role.'),
  experienceBullets: z.array(z.string()).describe('Three example bullet points for a work experience section, highlighting common responsibilities and achievements for this role. Start each bullet point with an action verb.'),
});
export type TailorResumeOutput = z.infer<typeof TailorResumeOutputSchema>;
