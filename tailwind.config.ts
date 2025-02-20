import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.25' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.75' }],
        lg: ['1.125rem', { lineHeight: '1.75' }],
        xl: ['1.25rem', { lineHeight: '1.75' }],
        '2xl': ['1.5rem', { lineHeight: '2' }],
        '3xl': ['1.875rem', { lineHeight: '2.25' }],
        '4xl': ['2.25rem', { lineHeight: '2.5' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.1' }],
        '9xl': ['8rem', { lineHeight: '1.1' }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        boldlarge: '900',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      spacing: {
        px: '1px',
        0: '0',
        0.5: '0.125rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        2.5: '0.625rem',
        3: '0.75rem',
        3.5: '0.875rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        11: '2.75rem',
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
        40: '10rem',
        44: '11rem',
        48: '12rem',
        52: '13rem',
        56: '14rem',
        60: '15rem',
        64: '16rem',
        72: '18rem',
        80: '20rem',
        96: '24rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(({ addComponents }) => {
      const components: Record<string, Record<string, any>> = {
        '.layout-container': {
          width: '100%',
          margin: '0 auto',
          padding: '2rem 1rem',

          '@screen md': {
            width: '90%',
            maxWidth: '1700px',
            margin: '0 auto',
            padding: '6rem 1rem',
          },
        },
        '.heading-h1': {
          fontSize: '4rem',
          fontWeight: '600',
          lineHeight: '1.80rem',

          '@screen md': {
            fontSize: '6rem',
            fontWeight: '900',
            lineHeight: '4rem',
          },
        },
        '.heading-h2': {
          fontSize: '3rem',
          fontWeight: '600',
          lineHeight: '1.80rem',

          '@screen md': {
            fontSize: '3.5rem',
            fontWeight: '800',
            lineHeight: '4rem',
          },
        },
        '.heading-h3': {
          fontSize: '2rem',
          fontWeight: '600',
          lineHeight: '1.80rem',

          '@screen md': {
            fontSize: '3rem',
            fontWeight: '800',
            lineHeight: '1rem',
          },
        },
        '.heading-h4': {
          fontSize: '1.80rem',
          fontWeight: '500',
          lineHeight: '1.80rem',

          '@screen md': {
            fontSize: '2rem',
            fontWeight: '500',
            lineHeight: '2.50rem',
          },
        },
        '.para': {
          fontSize: '0.80rem',
          fontWeight: '400',
          lineHeight: '1.80rem',

          '@screen md': {
            fontSize: '1.40rem',
            fontWeight: '600',
            lineHeight: '2rem',
          },
        },
        '.center-xy': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          padding: '.90rem 1.90rem',
          borderRadius: '8px',
          transition: 'all 0.3s ease-in-out',
          border: '1px solid transparent',
          outline: 'none',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',

          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 2px #d1d5db',
          },
        },

        /* Primary Button */
        '.btn-primary': {
          backgroundColor: '#2563eb',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1e4bb8',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
          },
          '&:focus': {
            boxShadow: '0 0 0 2px #3b82f6',
          },
        },
        '.dark .btns-primary': {
          backgroundColor: '#3b82f6',
          '&:hover': {
            backgroundColor: '#1e40af',
          },
        },

        /* Secondary Button */
        '.btn-secondary': {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          '&:hover': {
            backgroundColor: '#e5e7eb',
          },
          '&:focus': {
            boxShadow: '0 0 0 2px #d1d5db',
          },
        },
        '.dark .btn-secondary': {
          backgroundColor: '#374151',
          color: '#f9fafb',
          '&:hover': {
            backgroundColor: '#4b5563',
          },
        },

        /* Outline Button */
        '.btn-outline': {
          backgroundColor: 'transparent',
          border: '1px solid #d1d5db',
          color: '#374151',
          '&:hover': {
            backgroundColor: '#f9fafb',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
          },
          '&:focus': {
            boxShadow: '0 0 0 2px #d1d5db',
          },
        },
        '.dark .btn-outline': {
          border: '1px solid #4b5563',
          color: '#f9fafb',
          '&:hover': {
            backgroundColor: '#1f2937',
          },
        },

        /* Ghost Button */
        '.btn-ghost': {
          backgroundColor: 'transparent',
          color: '#374151',
          '&:hover': {
            backgroundColor: '#f3f4f6',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
          },
          '&:focus': {
            boxShadow: '0 0 0 2px #d1d5db',
          },
        },
        '.dark .btn-ghost': {
          color: '#f9fafb',
          '&:hover': {
            backgroundColor: '#1f2937',
          },
        },

        /* Danger Button */
        '.btn-danger': {
          backgroundColor: '#dc2626',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#b91c1c',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
          },
          '&:focus': {
            boxShadow: '0 0 0 2px #ef4444',
          },
        },
        '.dark .btn-danger': {
          backgroundColor: '#ef4444',
          '&:hover': {
            backgroundColor: '#b91c1c',
          },
        },
      };
      addComponents(components);
    }),
  ],
} satisfies Config;
function theme(arg0: string) {
  throw new Error('Function not implemented.');
}
