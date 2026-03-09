/**
 * A simple in-memory key-value store with TTL support.
 * Designed purely as a drop-in replacement for basic Redis operations
 * (set, get, del, keys) in a single-instance Phase 1 (MVP) environment.
 */
class MemoryCache {
  private store: Map<string, { value: string; expiresAt: number | null }> =
    new Map();

  /**
   * Set a key to hold a string value.
   * If `mode` is 'EX' and `ttlSeconds` is provided, the key will expire after the given seconds.
   */
  async set(
    key: string,
    value: string,
    mode?: 'EX',
    ttlSeconds?: number,
  ): Promise<'OK'> {
    let expiresAt: number | null = null;
    if (mode === 'EX' && ttlSeconds !== undefined) {
      expiresAt = Date.now() + ttlSeconds * 1000;
    }
    this.store.set(key, { value, expiresAt });
    return 'OK';
  }

  /**
   * Get the value of a key.
   * Returns `null` if the key does not exist or has expired.
   */
  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;

    if (item.expiresAt !== null && Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Remove the specified keys.
   */
  async del(...keys: string[]): Promise<number> {
    let deletedCount = 0;
    for (const key of keys) {
      if (this.store.delete(key)) {
        deletedCount++;
      }
    }
    return deletedCount;
  }

  /**
   * Find all keys matching the given pattern.
   * Only supports simple wildcard matching at the end, e.g. "prefix:*"
   */
  async keys(pattern: string): Promise<string[]> {
    const isPrefixSearch = pattern.endsWith('*');
    const prefix = isPrefixSearch ? pattern.slice(0, -1) : pattern;

    const matchedKeys: string[] = [];

    for (const [key, item] of Array.from(this.store.entries())) {
      // Clean up expired items proactively while iterating
      if (item.expiresAt !== null && Date.now() > item.expiresAt) {
        this.store.delete(key);
        continue;
      }

      if (isPrefixSearch) {
        if (key.startsWith(prefix)) matchedKeys.push(key);
      } else {
        if (key === pattern) matchedKeys.push(key);
      }
    }

    return matchedKeys;
  }

  /**
   * Clears the entire cache. Useful for testing.
   */
  clear() {
    this.store.clear();
  }
}

// Export a singleton instance
export const memoryCache = new MemoryCache();
