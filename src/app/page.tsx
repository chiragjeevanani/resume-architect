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
import { Download, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ClassicTemplate from '@/components/resume/templates/ClassicTemplate';
import ModernTemplate from '@/components/resume/templates/ModernTemplate';
import CompactTemplate from '@/components/resume/templates/CompactTemplate';

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

type TemplateKey = 'classic' | 'modern' | 'compact';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('classic');
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
  });

  const handleDownloadPdf = async () => {
    const element = previewRef.current;
    if (!element) return;
    
    setIsDownloading(true);

    const canvas = await html2canvas(element, {
      scale: 3, 
      useCORS: true, 
      logging: false,
    });

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
  };

  const SelectedResume = templates[selectedTemplate];

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <ScrollArea className="h-screen">
        <div className="p-4 md:p-8">
          <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold text-primary">Resume Architect</h1>
            <p className="text-muted-foreground mt-2">Fill in your details to build your professional resume.</p>
          </header>
          <ResumeForm form={form} setResumeData={setResumeData} />
        </div>
      </ScrollArea>

      <div className="bg-muted/50 p-4 md:p-8 flex flex-col items-center justify-start lg:h-screen">
        <div className="w-full flex justify-between items-center mb-4 sticky top-4 z-10 gap-4">
            <div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg border">
                <RadioGroup defaultValue="classic" onValueChange={(value: string) => setSelectedTemplate(value as TemplateKey)} className="flex items-center gap-4">
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
                </RadioGroup>
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
            <div ref={previewRef} className="w-full">
              <SelectedResume data={resumeData} />
            </div>
        </ScrollArea>
      </div>
    </main>
  );
}
