import { randomBytes } from 'crypto';

/**
 * Generate a URL-friendly slug from a title string.
 * Appends a random 6-char hex suffix for uniqueness.
 */
export function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars (except spaces & hyphens)
    .replace(/[\s_]+/g, '-') // replace spaces/underscores with hyphens
    .replace(/-+/g, '-') // collapse consecutive hyphens
    .replace(/^-|-$/g, ''); // trim leading/trailing hyphens

  const suffix = randomBytes(3).toString('hex'); // 6-char hex
  const slug = `${base}-${suffix}`;

  return slug.slice(0, 100); // cap at 100 chars
}
