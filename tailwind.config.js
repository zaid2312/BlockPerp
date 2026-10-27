/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0A1020",
          deep: "#060A14",
          surface: "#111A2E",
          card: "rgba(17, 26, 46, 0.75)",
          hover: "#1A253D",
        },
        teal: {
          DEFAULT: "#1F8A99",
          bright: "#2DD4BF",
          glow: "rgba(45, 212, 191, 0.25)",
        },
        sunrise: {
          DEFAULT: "#F28C28",
          light: "#FFB454",
          glow: "rgba(242, 140, 40, 0.25)",
        },
        coral: {
          DEFAULT: "#E5484D",
          dim: "#9B2C30",
        },
        coolgray: {
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "Sora", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "block-pulse": "blockPulse 1.8s ease-in-out infinite",
        "ticker-slide": "tickerSlide 25s linear infinite",
      },
      keyframes: {
        blockPulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        tickerSlide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "teal-glow": "0 0 20px rgba(45, 212, 191, 0.35)",
        "sunrise-glow": "0 0 25px rgba(242, 140, 40, 0.4)",
      },
    },
  },
  plugins: [],
};
