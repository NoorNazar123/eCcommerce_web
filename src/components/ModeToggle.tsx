'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure the component is mounted on the client-side
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If the component is not mounted yet, prevent rendering
  if (!mounted) return null;

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      onClick={toggleTheme}
      // variant="outline"
      size="icon"
      className="p-[19px] text-gray-800 dark:text-white hover:bg-transparent hover:text-[#FFD79E] dark:hover:text-gray-300"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 transition-all" />
      ) : (
        <Moon className="h-5 w-5 transition-all" />
      )}
    </Button>
  );
}
