import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B0F14",
        primary: "#E6EDF3",
        secondary: "#94A3B8",
        cyan: "#3AAFA9",
        blue: "#5B7CFF",
        overlay: "rgba(11, 15, 20, 0.75)",
        glass: {
          base: "#0f151c",
          border: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.15)"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"]
      },
      maxWidth: {
        cockpit: "1440px"
      },
      boxShadow: {
        glass: "0 18px 50px rgba(0, 0, 0, 0.28)",
        accent: "0 0 0 1px rgba(58, 175, 169, 0.18), 0 12px 30px rgba(0, 0, 0, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
