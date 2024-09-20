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
        'custom-gradient':
          'linear-gradient(-74deg, #2C5EEB 0%, #FFEE1A 34%, #2C5EEB 66%, #FFEE1A 100%)',
      },
      colors: {
        red: {
          B10: '#E7001B',
        },
        blue: {
          secondary: '#002387',
          B30: '#2C5DEA',
          B50: '#00144B',
          B70: '#08112C',
        },
        yellow: {
          primary: '#FFEE1A',
          200: '#FFF687',
          300: '#FFEA89',
          500: '#EEBA00',
          600: '#FFD300',
        },
        gray: {
          B25: '#F3F3F3',
          B27: '#F6F6F6',
          B30: '#EFEFEF',
          B35: '#E4E4E4',
          B40: '#DFDFDF',
          B45: '#CFCFCF',
          B50: '#DDDDDD',
          B60: '#ACACAC',
          B65: '#A5A5A5',
          B70: '#95959D',
          B80: '#555555',
          B85: '#7E7E77',
        },
        basic: {
          B10: '#F3F2E8',
          B20: '#DCDAC4',
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
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-70%)' },
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
