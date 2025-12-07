import type { ResumeData } from './types';

export const initialData: ResumeData = {
  personalInfo: {
    name: 'Amelia Vance',
    title: 'Senior Product Designer',
    phone: '+1 (555) 123-4567',
    email: 'amelia.vance@example.com',
    linkedin: 'linkedin.com/in/ameliavance',
    github: 'github.com/ameliavance',
  },
  summary:
    'A seasoned product designer with over a decade of experience in user-centered design, specializing in creating intuitive and beautiful interfaces for complex web applications. Proven ability to lead design teams and collaborate effectively with cross-functional stakeholders to deliver products that meet both user needs and business goals.',
  experience: [
    {
      id: 'exp1',
      jobTitle: 'Senior Product Designer',
      company: 'Innovate Corp',
      location: 'San Francisco, CA',
      startDate: 'Jun 2018',
      endDate: 'Present',
      description:
        '- Led the redesign of the flagship SaaS platform, resulting in a 20% increase in user engagement and a 15% reduction in support tickets.\n- Mentored a team of 3 junior designers, fostering a culture of collaboration and continuous improvement.\n- Established and maintained a comprehensive design system, ensuring brand consistency across all products.',
    },
    {
      id: 'exp2',
      jobTitle: 'UX/UI Designer',
      company: 'Creative Solutions',
      location: 'Austin, TX',
      startDate: 'Jul 2014',
      endDate: 'May 2018',
      description:
        '- Designed and shipped multiple features for a suite of mobile productivity apps.\n- Conducted user research, including interviews and usability testing, to inform design decisions.\n- Created wireframes, prototypes, and high-fidelity mockups for various projects.',
    },
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Bachelor of Fine Arts in Graphic Design',
      school: 'Rhode Island School of Design',
      location: 'Providence, RI',
      graduationYear: '2014',
    },
  ],
  skills: [
    'User-Centered Design',
    'UI/UX Design',
    'Prototyping & Wireframing',
    'Figma & Sketch',
    'Design Systems',
    'User Research',
    'Agile Methodologies',
    'HTML & CSS',
  ],
  projects: [
    {
      id: 'proj1',
      name: 'Portfolio Website',
      link: 'ameliavance.design',
      description:
        'Personal portfolio showcasing a curated selection of my design work. Built with React and Framer Motion.',
    },
    {
      id: 'proj2',
      name: 'Sidekick Mobile App',
      link: 'github.com/ameliavance/sidekick',
      description:
        'A concept for a personal task management app focused on simplicity and mindfulness.',
    },
  ],
};
