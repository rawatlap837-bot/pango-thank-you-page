import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" lets the built page work from any folder on your hosting
// (for example yoursite.com/thank-you/), not just from the main domain.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
