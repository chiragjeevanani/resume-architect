'use client';

import type { Control, UseFormRegister } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import type { ResumeData } from '@/lib/types';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';

interface ProjectsFormProps {
  control: Control<ResumeData>;
  register: UseFormRegister<ResumeData>;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  return (
    <div className="space-y-6">
      {fields.map((item, index) => (
        <div key={item.id} className="p-4 border rounded-lg space-y-4 relative">
          <FormField
            control={control}
            name={`projects.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="Portfolio Website" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`projects.${index}.link`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input placeholder="ameliavance.design" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`projects.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Personal portfolio showcasing a curated selection..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 h-7 w-7"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append({ id: `proj${fields.length + 1}`, name: '', link: '', description: '' })}
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add Project
      </Button>
    </div>
  );
};

export default ProjectsForm;
