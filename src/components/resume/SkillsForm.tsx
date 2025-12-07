'use client';

import React from 'react';
import type { Control } from 'react-hook-form';
import type { ResumeData } from '@/lib/types';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface SkillsFormProps {
  control: Control<ResumeData>;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ control }) => {
  return (
    <div className="p-4 border rounded-lg space-y-4">
      <FormField
        control={control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skills</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Figma, UI/UX Design, Prototyping..."
                {...field}
                onChange={(e) => {
                  const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
                  field.onChange(skillsArray);
                }}
                value={Array.isArray(field.value) ? field.value.join(', ') : ''}
              />
            </FormControl>
            <FormDescription>
              Enter skills separated by commas.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SkillsForm;
