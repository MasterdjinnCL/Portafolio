import type { Config } from 'tailwindcss';

export default <Config>{
  content: ['app.vue', 'components/**/*.{vue,js,ts}', 'layouts/**/*.vue', 'pages/**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#1f2937',
        accent: '#f97316'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ]
};
