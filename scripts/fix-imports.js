import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname, relative } from "path";

function getRelativePath(from, to) {
  const rel = relative(dirname(from), to).replace(/\\/g, "/");
  return rel.startsWith(".") ? rel : `./${rel}`;
}

function fixImportsInFile(filePath) {
  try {
    let content = readFileSync(filePath, "utf8");
    let hasChanges = false;
    const changes = [];

    // Replace @/ imports with relative paths
    content = content.replace(
      /from\s+['"`]@\/([^'"`]+)['"`]/g,
      (match, importPath) => {
        // Map common @/ paths to actual file locations
        const pathMappings = {
          "components/farePrivy/": "farePrivy/",
          "store/": "../store/",
          assets: "../assets",
          design: "../design",
          "hooks/": "../hooks/",
          "lib/": "../lib/",
          chains: "../chains",
          "constants/": "../constants/",
          style: "../style",
          "components/": "../components/",
        };

        let targetPath = importPath;

        // Apply path mappings
        // For farePrivy internal imports, use relative paths
        if (importPath.startsWith("components/farePrivy/")) {
          const relativePath = importPath.replace("components/farePrivy/", "");
          targetPath = getRelativePath(
            filePath,
            join("./farePrivy", relativePath)
          );
        } else {
          // Apply path mappings for non-farePrivy imports
          for (const [pattern, replacement] of Object.entries(pathMappings)) {
            if (importPath.startsWith(pattern)) {
              targetPath = importPath.replace(pattern, replacement);
              break;
            }
          }
        }
        hasChanges = true;
        const newImport = `from "${targetPath}"`;
        changes.push({ from: match, to: newImport });

        return newImport;
      }
    );

    if (hasChanges) {
      writeFileSync(filePath, content, "utf8");
      console.log(`✅ Fixed ${changes.length} imports in ${filePath}`);
      changes.forEach((change) => {
        console.log(`   ${change.from} → ${change.to}`);
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error fixing imports in ${filePath}:`, error.message);
    return false;
  }
}

function fixImportsInDirectory(dir) {
  let totalFixed = 0;
  const processedFiles = [];

  function walkDir(currentPath) {
    try {
      const items = readdirSync(currentPath);

      for (const item of items) {
        const fullPath = join(currentPath, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          walkDir(fullPath);
        } else if (item.endsWith(".ts") || item.endsWith(".tsx")) {
          if (fixImportsInFile(fullPath)) {
            totalFixed++;
            processedFiles.push(fullPath);
          }
        }
      }
    } catch (error) {
      console.log(`Error processing ${currentPath}:`, error.message);
    }
  }

  walkDir(dir);
  return { totalFixed, processedFiles };
}

console.log("🔧 Fixing absolute imports to relative imports in farePrivy...\n");

const farePrivyPath = "./farePrivy";
const result = fixImportsInDirectory(farePrivyPath);

console.log(`\n📊 SUMMARY:`);
console.log(`✅ Fixed imports in ${result.totalFixed} files`);
console.log(`📁 Processed files: ${result.processedFiles.length}`);

if (result.totalFixed > 0) {
  console.log("\n🎯 Next steps:");
  console.log("  1. Review the changes");
  console.log("  2. Test the build: npm run build");
  console.log("  3. Fix any remaining path issues manually");
  console.log("  4. Update index.ts to enable more exports");
}
