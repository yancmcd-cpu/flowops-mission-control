import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", ".next_stale_*/**"],
  },
  ...nextVitals,
];

export default config;
