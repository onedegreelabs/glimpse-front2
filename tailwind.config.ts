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
          300: '#2C5DEA',
          500: '#00144B',
        },
        yellow: {
          primary: '#FFEE1A',
          300: '#FFEA89',
          500: '#EEBA00',
        },
        gray: {
          B30: '#EFEFEF',
          B60: '#ACACAC',
          B70: '#95959D',
        },
        background: '#091C53',
      },
      zIndex: {
        blur: '50',
        header: '20',
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
