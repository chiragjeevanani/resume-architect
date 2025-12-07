
'use client';

import * as React from 'react';
import { Check, Palette } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from './theme-provider';

const themes = [
  { name: 'default', color: 'hsl(222.2 47.4% 11.2%)' },
  { name: 'green', color: 'hsl(142.1 76.2% 36.3%)' },
  { name: 'blue', color: 'hsl(217.2 91.2% 59.8%)' },
  { name: 'orange', color: 'hsl(24.6 95% 53.1%)' },
  { name: 'purple', color: 'hsl(262.1 83.3% 57.8%)' },
];

export default function ColorPicker() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-auto gap-2 px-3 py-2 text-sm"
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full"
            style={{ backgroundColor: themes.find(t => t.name === theme)?.color || themes[0].color }}
          >
          </span>
          <span className="capitalize">{theme}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {themes.map((t) => (
          <DropdownMenuItem key={t.name} onClick={() => setTheme(t.name)}>
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: t.color }}
              ></div>
              <span className="capitalize">{t.name}</span>
            </div>
            {theme === t.name && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
