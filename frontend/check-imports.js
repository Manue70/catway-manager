import fs from "fs";
import path from "path";

// Dossier à scanner
const srcDir = path.resolve("src");

// Fonction récursive pour lister tous les fichiers JSX
function getAllJsxFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJsxFiles(fullPath));
    } else if (file.endsWith(".jsx") || file.endsWith(".js")) {
      results.push(fullPath);
    }
  });
  return results;
}

// Vérifier les imports
function checkImports() {
  const files = getAllJsxFiles(srcDir);
  const missingImports = [];

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf-8");
    const importRegex = /import\s+.*\s+from\s+["'](.+)["']/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      let importPath = match[1];
      // On ne teste que les imports relatifs
      if (importPath.startsWith(".")) {
        let resolvedPath = path.resolve(path.dirname(file), importPath);
        // On teste plusieurs extensions possibles
        const exists =
          fs.existsSync(resolvedPath + ".js") ||
          fs.existsSync(resolvedPath + ".jsx") ||
          fs.existsSync(resolvedPath + ".css") ||
          fs.existsSync(resolvedPath + "/index.js") ||
          fs.existsSync(resolvedPath + "/index.jsx");

        if (!exists) {
          missingImports.push({
            file: path.relative(srcDir, file),
            importPath,
          });
        }
      }
    }
  });

  if (missingImports.length > 0) {
    console.log("❌ Imports manquants ou mal orthographiés détectés :");
    missingImports.forEach((mi) =>
      console.log(`- ${mi.file} → ${mi.importPath}`)
    );
  } else {
    console.log("✅ Tous les imports sont corrects !");
  }
}

checkImports();
