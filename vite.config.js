import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For a username.github.io repo (user/organization page), the site is
// served from the domain root, so base stays "/". If you ever move this
// into a *project* page repo instead (served from a subpath), change
// base to "/your-repo-name/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
