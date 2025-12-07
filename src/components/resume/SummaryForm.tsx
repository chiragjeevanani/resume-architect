'use client';

import type { Control } from 'react-hook-form';
import type { ResumeData } from '@/lib/types';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface SummaryFormProps {
  control: Control<ResumeData>;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ control }) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <FormField
        control={control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Summary</FormLabel>
            <FormControl>
              <Textarea
                placeholder="A seasoned product designer with over a decade of experience..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SummaryForm;
