// TEMPLATE — copy this file, rename it to something like
// 2026-03-01-my-post-slug.js, fill in the fields below, and it will
// automatically show up on the Research page's Blog tab. No need to
// import or register it anywhere else — every file in this folder
// (except this one, filtered out by filename) is picked up automatically.
export default {
  slug: "my-post-slug", // unique, used as the React key and anchor
  title: "My Post Title",
  date: "2026-03-01", // YYYY-MM-DD — used for sorting, newest first
  summary: "One or two sentences shown in the post list before it's opened.",
  tags: ["formal-verification"],
  content: `
Write the full post here as plain text. Separate paragraphs with a
blank line, like this one.

You can add links anywhere using [label](url) syntax — for example,
a link to [HyperProb on GitHub](https://github.com/TART-MSU/HyperProb).
`,
};
