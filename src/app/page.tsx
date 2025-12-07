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
import { Download, Loader2, Palette } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('classic');
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { theme } = useTheme();

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  });

  const handleDownloadPdf = async () => {
    const element = previewRef.current;
    if (!element) return;
    
    setIsDownloading(true);

    // Temporarily set theme to light for PDF generation for consistency
    const originalTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', 'default');
    await new Promise(resolve => setTimeout(resolve, 100));


    const canvas = await html2canvas(element, {
      scale: 3, 
      useCORS: true, 
      logging: false,
      backgroundColor: null,
    });

    if(originalTheme) {
        document.documentElement.setAttribute('data-theme', originalTheme);
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    const widthInPdf = pdfWidth;
    let heightInPdf = widthInPdf / ratio;
    
    let position = 0;
    
    if (heightInPdf > pdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, position, widthInPdf, heightInPdf);
      heightInPdf -= pdfHeight;
      while(heightInPdf > 0) {
        position = position - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, widthInPdf, heightInPdf);
        heightInPdf -= pdfHeight;
      }
    } else {
        pdf.addImage(imgData, 'PNG', 0, 0, widthInPdf, heightInPdf);
    }

    pdf.save(`Resume-${resumeData.personalInfo.name.replace(' ', '-')}.pdf`);
    
    setIsDownloading(false);
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
          <ResumeForm form={form} setResumeData={setResumeData} />
        </div>
      </ScrollArea>

      <div className="bg-muted/50 p-4 md:p-8 flex flex-col items-center justify-start lg:h-screen">
        <div className="w-full flex justify-between items-start mb-4 sticky top-4 z-10 gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg border flex items-center gap-2">
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        <ColorPicker />
                    </div>
                </div>
                <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg border">
                    <RadioGroup defaultValue="classic" onValueChange={(value: string) => setSelectedTemplate(value as TemplateKey)} className="flex items-center flex-wrap gap-x-4 gap-y-2">
                        <Label>Templates:</Label>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="classic" id="t-classic" />
                            <Label htmlFor="t-classic">Classic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="modern" id="t-modern" />
                            <Label htmlFor="t-modern">Modern</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="compact" id="t-compact" />
                            <Label htmlFor="t-compact">Compact</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="creative" id="t-creative" />
                            <Label htmlFor="t-creative">Creative</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="technical" id="t-technical" />
                            <Label htmlFor="t-technical">Technical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="minimalist" id="t-minimalist" />
                            <Label htmlFor="t-minimalist">Minimalist</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="professional" id="t-professional" />
                            <Label htmlFor="t-professional">Professional</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="academic" id="t-academic" />
                            <Label htmlFor="t-academic">Academic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="executive" id="t-executive" />
                            <Label htmlFor="t-executive">Executive</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="two-column" id="t-two-column" />
                            <Label htmlFor="t-two-column">Two Column</Label>
                        </div>
                    </RadioGroup>
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
