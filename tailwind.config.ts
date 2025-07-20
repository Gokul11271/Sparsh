import type { Config } from "tailwindcss";

// all in fixtures is set to tailwind v3 as interim solution

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Your existing color setup (unchanged)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... rest of your colors
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },

      /**  ✅ Add Custom Fonts Here **/
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        vibes: ['"Great Vibes"', 'cursive'],
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
