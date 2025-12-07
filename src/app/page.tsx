'use client';

import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import type { ResumeData } from '@/lib/types';
import { initialData } from '@/lib/initial-data';
import ResumeForm from '@/components/resume/ResumeForm';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Palette, Sparkles, ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import ClassicTemplate from '@/components/resume/templates/ClassicTemplate';
import ModernTemplate from '@/components/resume/templates/ModernTemplate';
import CompactTemplate from '@/components/resume/templates/CompactTemplate';
import CreativeTemplate from '@/components/resume/templates/CreativeTemplate';
import TechnicalTemplate from '@/components/resume/templates/TechnicalTemplate';
import MinimalistTemplate from '@/components/resume/templates/MinimalistTemplate';
import ProfessionalTemplate from '@/components/resume/templates/ProfessionalTemplate';
import AcademicTemplate from '@/components/resume/templates/AcademicTemplate';
import ExecutiveTemplate from '@/components/resume/templates/ExecutiveTemplate';
import TwoColumnTemplate from '@/components/resume/templates/TwoColumnTemplate';
import ColorPicker from '@/components/ColorPicker';
import { useTheme } from '@/components/theme-provider';
import { tailorResume } from '@/ai/flows/tailor-resume-flow';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const resumeSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    title: z.string(),
    phone: z.string(),
    email: z.string(),
    linkedin: z.string(),
    github: z.string(),
  }),
  summary: z.string(),
  experience: z.array(z.object({
    id: z.string(),
    jobTitle: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string(),
  })),
  education: z.array(z.object({
    id: z.string(),
    degree: z.string(),
    school: z.string(),
    location: z.string(),
    graduationYear: z.string(),
  })),
  skills: z.array(z.string()),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    link: z.string(),
  })),
});

type TemplateKey = 'classic' | 'modern' | 'compact' | 'creative' | 'technical' | 'minimalist' | 'professional' | 'academic' | 'executive' | 'two-column';

const templateLabels: Record<TemplateKey, string> = {
    classic: 'Classic',
    modern: 'Modern',
    compact: 'Compact',
    creative: 'Creative',
    technical: 'Technical',
    minimalist: 'Minimalist',
    professional: 'Professional',
    academic: 'Academic',
    executive: 'Executive',
    'two-column': 'Two Column',
};

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('classic');
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { theme } = useTheme();
  const [jobRole, setJobRole] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  });

  const handleAiGeneration = async () => {
    if (!jobRole) {
        toast({
            variant: "destructive",
            title: "Job Role Required",
            description: "Please enter a job role to generate tailored content.",
        });
        return;
    }
    setIsGenerating(true);
    try {
        const result = await tailorResume({ jobRole });
        form.setValue('summary', result.summary);
        form.setValue('skills', result.skills);
        
        // Update the first experience description or add a new one if none exist
        const currentExperience = form.getValues('experience');
        const newDescription = result.experienceBullets.map(b => `- ${b}`).join('\n');
        if(currentExperience.length > 0) {
            form.setValue('experience.0.description', newDescription);
        } else {
            form.setValue('experience', [{
                id: 'exp1',
                jobTitle: jobRole,
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                description: newDescription
            }]);
        }
        toast({
            title: "Resume Tailored!",
            description: `Your resume has been updated for a ${jobRole} role.`,
        });

    } catch (error) {
        console.error("AI generation failed:", error);
        toast({
            variant: "destructive",
            title: "AI Generation Failed",
            description: "Could not generate content. Please try again.",
        });
    }
    setIsGenerating(false);
  };

  const handleDownloadPdf = async () => {
    const element = previewRef.current;
    if (!element) return;
    
    setIsDownloading(true);

    try {
      // Temporarily set theme to light for PDF generation for consistency
      const originalTheme = document.documentElement.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', 'default');
      
      // Wait for theme change and fonts to load
      await new Promise(resolve => setTimeout(resolve, 300));

      // Scroll to top to ensure we capture the full resume
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: 2, // Reduced from 3 for better performance while maintaining quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff', // White background
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure fonts are loaded in cloned document
          const clonedElement = clonedDoc.querySelector('[data-theme]');
          if (clonedElement) {
            clonedElement.setAttribute('data-theme', 'default');
          }
        },
      });

      // Restore original theme
      if(originalTheme) {
        document.documentElement.setAttribute('data-theme', originalTheme);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      const imgData = canvas.toDataURL('image/png', 1.0); // Maximum quality
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      
      // Calculate dimensions to fit the page with margins
      const margin = 5; // 5mm margin on all sides
      const contentWidth = pdfWidth - (margin * 2);
      const contentHeight = pdfHeight - (margin * 2);
      
      // Scale to fit width, maintain aspect ratio
      let imgWidthInPdf = contentWidth;
      let imgHeightInPdf = imgWidthInPdf / ratio;
      
      // If image is taller than one page, split across multiple pages
      if (imgHeightInPdf > contentHeight) {
        const totalPages = Math.ceil(imgHeightInPdf / contentHeight);
        const sourcePageHeight = imgHeight / totalPages;
        const pageHeightInPdf = imgHeightInPdf / totalPages;
        
        for (let i = 0; i < totalPages; i++) {
          if (i > 0) {
            pdf.addPage();
          }
          
          // Calculate source y position
          const sourceY = sourcePageHeight * i;
          
          // Create a canvas for this page slice
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgWidth;
          pageCanvas.height = Math.ceil(sourcePageHeight);
          const ctx = pageCanvas.getContext('2d');
          
          if (ctx) {
            // Fill with white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            
            // Draw the slice
            ctx.drawImage(
              canvas,
              0, sourceY, imgWidth, sourcePageHeight,
              0, 0, imgWidth, sourcePageHeight
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png', 1.0);
            pdf.addImage(pageImgData, 'PNG', margin, margin, imgWidthInPdf, pageHeightInPdf);
          }
        }
      } else {
        // Image fits on one page
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidthInPdf, imgHeightInPdf);
      }

      const fileName = `Resume-${resumeData.personalInfo.name.replace(/\s+/g, '-')}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: "destructive",
        title: "PDF Generation Failed",
        description: "Could not generate PDF. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const templates: { [key in TemplateKey]: React.ComponentType<{ data: ResumeData }> } = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    compact: CompactTemplate,
    creative: CreativeTemplate,
    technical: TechnicalTemplate,
    minimalist: MinimalistTemplate,
    professional: ProfessionalTemplate,
    academic: AcademicTemplate,
    executive: ExecutiveTemplate,
    'two-column': TwoColumnTemplate,
  };

  const SelectedResume = templates[selectedTemplate];

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <ScrollArea className="h-screen">
        <div className="p-4 md:p-8">
          <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold text-primary">Resume Architect by Chirag</h1>
            <p className="text-muted-foreground mt-2">Fill in your details to build your professional resume.</p>
          </header>
            <div className="p-4 border rounded-lg mb-6 bg-secondary/50">
                <Label htmlFor='ai-job-role' className="text-base font-semibold flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    AI Resume Tailoring
                </Label>
                <p className="text-sm text-muted-foreground mb-3">
                    Enter your target job role, and let AI generate a tailored summary, skills, and experience points for you.
                </p>
                <div className="flex gap-2">
                    <Input 
                        id="ai-job-role"
                        placeholder="e.g., 'Senior Software Engineer'"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        disabled={isGenerating}
                    />
                    <Button onClick={handleAiGeneration} disabled={isGenerating}>
                        {isGenerating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                           <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Generate
                    </Button>
                </div>
            </div>
          <ResumeForm form={form} setResumeData={setResumeData} />
        </div>
      </ScrollArea>

      <div className="bg-muted/50 p-4 md:p-8 flex flex-col items-center justify-start lg:h-screen">
        <div className="w-full flex justify-between items-start mb-4 sticky top-4 z-10 gap-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg border flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <ColorPicker />
                </div>
                <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg border">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-[150px] justify-between">
                                {templateLabels[selectedTemplate]}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full sm:w-[150px]">
                            {Object.entries(templateLabels).map(([key, label]) => (
                                <DropdownMenuItem key={key} onSelect={() => setSelectedTemplate(key as TemplateKey)}>
                                    {label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
          <Button onClick={handleDownloadPdf} disabled={isDownloading}>
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
        <ScrollArea className="w-full h-full">
            <div ref={previewRef} className="w-full" data-theme={theme}>
              <SelectedResume data={resumeData} />
            </div>
        </ScrollArea>
      </div>
    </main>
  );
}
