import fs from "fs";
import path from "path";

export interface FlattenFile {
  name: string;
  path: string;
}

/**
 * Read the folder and flatten it
 */
export const flattenReadFile = (directory: string): FlattenFile[] => {
  const result: FlattenFile[] = [];

  function traverseDir(currentPath: string): void {
    const files = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const file of files) {
      const filePath: string = path.join(currentPath, file.name);
      if (file.isDirectory()) traverseDir(filePath);
      else if (file.isFile()) {
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

/**
 * Read the folders asynchronously and flatten it
 */
export const flattenReadFileSync = async (directory: string) => {
  const result: FlattenFile[] = [];

  async function traverseDir(currentPath: string): Promise<void> {
    const files: fs.Dirent[] = fs.readdirSync(directory, {
      withFileTypes: true,
    });
    for (const file of files) {
      const filePath: string = path.join(currentPath, file.name);
      if (file.isDirectory()) traverseDir(filePath);
      else if (file.isFile()) {
        result.push({
          name: file.name,
          path: filePath,
        });
      }
    }
  }
  await traverseDir(directory);
  return result;
};
