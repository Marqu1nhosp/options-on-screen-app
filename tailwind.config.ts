import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
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
        'gradiente-linear-dark':
          'linear-gradient(to right, #323F4F, #1e293b, #0f172a)',
        'gradiente-linear-light':
          'linear-gradient(to right, #fafaf9, #d6d3d1, #a1a1aa)',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}
export default config
