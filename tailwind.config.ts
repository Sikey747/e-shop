import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily:{
      "f1": "var(--f1)",
      "f2": "var(--f2)",
    },
    extend: {
      height: {
        "screen": "100dvh",
      }
    },
  },
  plugins: [],
}
export default config
