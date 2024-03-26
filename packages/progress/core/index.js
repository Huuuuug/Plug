import fs from "fs";
import path from "path";

export const flattenReadFile = (directory) => {
  const result = [];

  function traverseDir(currentPath) {
    const files = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(currentPath, file.name);
      if (file.isDirectory()) {
        console.log(file);
        traverseDir(filePath);
      } else if (file.isFile()) {
        result.push({
          name: file.name,
          path: filePath,
        });
      }
    }
  }
  traverseDir(directory);
  return result;
};

const entries = flattenReadFile(path.join(process.cwd(), "example/src"));

for (const entry of entries) {
  console.log(entry);
}
