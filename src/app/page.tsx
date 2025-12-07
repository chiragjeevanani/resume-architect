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
import ResumePreview from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
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
      scale: 3, // Higher scale for better quality
      useCORS: true, 
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    // A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    const widthInPdf = pdfWidth;
    const heightInPdf = widthInPdf / ratio;
    
    // If the content is taller than one page, we might need to split it,
    // for this single-page resume, we assume it fits.
    pdf.addImage(imgData, 'PNG', 0, 0, widthInPdf, heightInPdf);
    pdf.save(`Resume-${resumeData.personalInfo.name.replace(' ', '-')}.pdf`);
    
    setIsDownloading(false);
  };

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
        <div className="w-full flex justify-end items-center mb-4 sticky top-4 z-10">
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
              <ResumePreview data={resumeData} />
            </div>
        </ScrollArea>
      </div>
    </main>
  );
}
