/**
 * Parses file paths from a ZIP/directory structure and groups fish images by category and fish name.
 * 
 * Expected file path format: "photos/{CategoryName}/{FishName} ({Number}).jpg"
 * Example: "photos/Seer Fish/Premium Seer (1).jpg"
 * 
 * @param {string[]} filePaths - Array of file paths to parse.
 * @returns {Object} Structured data grouped by Category -> Fish -> [image1, image2]
 */
export function parseFishImages(filePaths) {
  const data = {};

  filePaths.forEach((filePath) => {
    // Normalize slashes to forward slashes for cross-platform support
    const normalizedPath = filePath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    
    // Locate the "photos" root directory segment
    const photosIndex = parts.indexOf('photos');
    
    // Ensure the path has the expected depth: photos/CategoryName/Filename
    if (photosIndex === -1 || parts.length < photosIndex + 3) return;

    const category = parts[photosIndex + 1];
    const filename = parts[parts.length - 1];

    // Regex to extract Fish Name and the Image Number
    // Matches patterns like: "Tiger Prawns (1).jpg" or "Tuna Steak (2).png"
    // Captures group 1: FishName, group 2: Number
    const match = filename.match(/^(.+?)\s*\((\d+)\)\.[a-zA-Z0-9]+$/);
    
    if (match) {
      const fishName = match[1].trim();
      const imageNumber = parseInt(match[2], 10);

      // Initialize category mapping if it doesn't exist
      if (!data[category]) {
        data[category] = {};
      }
      
      // Initialize array for images if it doesn't exist for this fish
      if (!data[category][fishName]) {
        data[category][fishName] = [];
      }

      // Map (1) to index 0, (2) to index 1, etc., preserving exact array order
      data[category][fishName][imageNumber - 1] = filePath;
    }
  });

  // Cleanup: In case an image number was skipped (e.g. only had a "(2).jpg"), 
  // filter out undefined/null slots in the arrays to avoid breakage when rendering.
  for (const category in data) {
    for (const fishName in data[category]) {
      data[category][fishName] = data[category][fishName].filter(Boolean);
    }
  }

  return data;
}
