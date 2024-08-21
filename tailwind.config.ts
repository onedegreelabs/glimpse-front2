import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue: {
          secondary: '#002387',
          B30: '#2C5DEA',
          B50: '#00144B',
          B70: '#08112C',
        },
        yellow: {
          primary: '#FFEE1A',
          300: '#FFEA89',
          500: '#EEBA00',
        },
        gray: {
          B25: '#F3F3F3',
          B30: '#EFEFEF',
          B35: '#E4E4E4',
          B40: '#DFDFDF',
          B60: '#ACACAC',
          B70: '#95959D',
        },
        background: '#091C53',
      },
      zIndex: {
        blur: '50',
        event: '60',
        header: '20',
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('tailwindcss/plugin')(
      ({
        addVariant,
      }: {
        addVariant: (variant: string, styles: string) => void;
      }) => {
        addVariant('search-cancel', '&::-webkit-search-cancel-button');
      },
    ),
  ],
};
export default config;
