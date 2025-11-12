import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join } from "path";

function findImportsInFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const imports = [];

    // Find import statements
    const importRegex =
      /import\s+(?:{[^}]*}|\w+|\*\s+as\s+\w+)?\s*(?:,\s*(?:{[^}]*}|\w+))?\s*from\s+['"`]([^'"`]+)['"`]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      imports.push({
        statement: match[0],
        module: match[1],
        isAbsolute: match[1].startsWith("@/"),
        isExternal:
          !match[1].startsWith(".") &&
          !match[1].startsWith("@/") &&
          !match[1].startsWith("node:"),
      });
    }

    return imports;
  } catch (error) {
    console.log(`Error reading ${filePath}: ${error.message}`);
    return [];
  }
}

function scanDirectory(dir) {
  const results = {};

  function walkDir(currentPath) {
    try {
      const items = readdirSync(currentPath);

      for (const item of items) {
        const fullPath = join(currentPath, item);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          walkDir(fullPath);
        } else if (item.endsWith(".ts") || item.endsWith(".tsx")) {
          const imports = findImportsInFile(fullPath);
          if (imports.length > 0) {
            results[fullPath] = imports;
          }
        }
      }
    } catch (error) {
      console.log(`Error scanning ${currentPath}: ${error.message}`);
    }
  }

  walkDir(dir);
  return results;
}

// Run the audit
console.log(
  "🔍 Scanning farePrivy directory for dependencies and imports...\n"
);

const farePrivyPath = "./farePrivy";

// Check if farePrivy directory exists
if (!existsSync(farePrivyPath)) {
  console.log("❌ farePrivy directory not found!");
  console.log("Available directories:");
  readdirSync(".").forEach((item) => {
    if (statSync(item).isDirectory()) {
      console.log(`  - ${item}`);
    }
  });
  process.exit(1);
}

const imports = scanDirectory(farePrivyPath);

const externalDeps = new Set();
const absoluteImports = [];
const allFiles = Object.keys(imports);

for (const [file, fileImports] of Object.entries(imports)) {
  for (const imp of fileImports) {
    if (imp.isExternal) {
      externalDeps.add(imp.module);
    }
    if (imp.isAbsolute) {
      absoluteImports.push({ file, import: imp });
    }
  }
}

console.log("📦 EXTERNAL DEPENDENCIES FOUND:");
if (externalDeps.size > 0) {
  Array.from(externalDeps)
    .sort()
    .forEach((dep) => {
      console.log(`  - ${dep}`);
    });
} else {
  console.log("  No external dependencies found");
}

console.log("\n🔗 ABSOLUTE IMPORTS (@/) TO FIX:");
if (absoluteImports.length > 0) {
  absoluteImports.forEach((item) => {
    console.log(`  ${item.file}:`);
    console.log(`    ${item.import.statement}`);
  });
} else {
  console.log("  No absolute imports found");
}

console.log(`\n📊 SUMMARY:`);
console.log(`  - External dependencies: ${externalDeps.size}`);
console.log(`  - Absolute imports to fix: ${absoluteImports.length}`);
console.log(`  - TypeScript files scanned: ${allFiles.length}`);

if (allFiles.length === 0) {
  console.log("\n⚠️  No TypeScript files found in farePrivy directory");
  console.log("This might indicate:");
  console.log("  1. The farePrivy directory is empty");
  console.log("  2. Files have different extensions");
  console.log("  3. Files are in subdirectories that need different scanning");
}

// Show some sample files found
if (allFiles.length > 0) {
  console.log("\n📁 Sample files found:");
  allFiles.slice(0, 5).forEach((file) => {
    console.log(`  - ${file}`);
  });
  if (allFiles.length > 5) {
    console.log(`  ... and ${allFiles.length - 5} more`);
  }
}
