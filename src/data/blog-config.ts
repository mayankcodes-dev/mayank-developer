/**
 * ─────────────────────────────────────────────────────
 *  Blog Configuration
 * ─────────────────────────────────────────────────────
 *
 *  FEATURED POST
 *  Set `featuredSlug` to the slug of any Hashnode post
 *  you want pinned in the hero section of /blog.
 *
 *  How to find a post slug:
 *    → Go to codermayank.hashnode.dev
 *    → Open the post you want to feature
 *    → The slug is the last part of the URL:
 *      e.g. "https://codermayank.hashnode.dev/my-post-title"
 *                                               ↑ this part
 *
 *  Leave as null to always show the latest post in the hero.
 * ─────────────────────────────────────────────────────
 */
export const blogConfig = {
  /** Slug of the post to pin in the hero. null = use latest post. */
  featuredSlug: null as string | null,
};
