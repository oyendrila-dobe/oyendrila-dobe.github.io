// Auto-discovers every post file in ./blog/ (except the template) and
// aggregates them, sorted newest first by `date`. To add a new research
// post: copy blog/_template.js to something like
// blog/2026-03-01-my-post.js, fill it in, and it appears automatically —
// no import to add here.
const modules = import.meta.glob("./blog/*.js", { eager: true });

export const researchBlogPosts = Object.entries(modules)
  .filter(([path]) => !path.includes("_template"))
  .map(([, mod]) => mod.default)
  .sort((a, b) => new Date(b.date) - new Date(a.date));
