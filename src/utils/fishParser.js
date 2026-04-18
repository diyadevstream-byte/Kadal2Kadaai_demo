/**
 * Parses a list of file paths from a fish marketplace photo directory 
 * and returns a structured object grouped by Category and Fish Name.
 *
 * @param {string[]} filePaths - Array of file paths (e.g., ["photos/Crabs/Blue Crab (1).jpg", ...])
 * @returns {Object} Structured fish data
 */
export function parseFishMetadata(filePaths) {
  const registry = {};

  // Supported image extensions
  const imageExtensions = /\.(jpe?g|png|webp|gif|avif)$/i;

  filePaths.forEach((path) => {
    // Only process images
    if (!imageExtensions.test(path)) return;

    // Normalize path separators
    const normalizedPath = path.replace(/\\/g, '/');
    const segments = normalizedPath.split('/');
    
    // Expecting at least: category/filename.ext
    if (segments.length < 2) return;

    const category = segments[segments.length - 2];
    const filename = segments[segments.length - 1];

    // Regex Explanation:
    // ^(.+?)           - Captures the fish name (lazy match)
    // \s*\(            - Optional whitespace followed by an opening parenthesis
    // (\d+)            - Captures the index number (1 for primary, 2 for secondary)
    // \)\.[^.]+$/      - Closing parenthesis, dot, and extension
    const match = filename.match(/^(.+?)\s*\((\d+)\)\.[^.]+$/);

    if (match) {
      const fishName = match[1].trim();
      const index = parseInt(match[2], 10);

      if (!registry[category]) {
        registry[category] = {};
      }

      if (!registry[category][fishName]) {
        registry[category][fishName] = {
          name: fishName,
          category: category,
          primary: null,
          secondary: null,
          images: []
        };
      }

      const fishEntry = registry[category][fishName];
      
      // Store full path for image reference
      fishEntry.images.push(normalizedPath);

      if (index === 1) {
        fishEntry.primary = normalizedPath;
      } else if (index === 2) {
        fishEntry.secondary = normalizedPath;
      }
    }
  });

  return registry;
}

/**
 * Helper to convert the registry into a flat array of fish products
 * useful for grid displays.
 */
export function flattenFishData(registry) {
  const result = [];
  Object.values(registry).forEach(categoryFish => {
    Object.values(categoryFish).forEach(fish => {
      result.push(fish);
    });
  });
  return result;
}
