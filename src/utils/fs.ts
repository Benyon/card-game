import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * Resolves a relative path to an absolute path based on the current module's location
 * @param directory - The relative path to resolve
 * @param metaUrl - has to be value "import.meta.url"
 * @returns The absolute path resolved from the current module's location
 */
export const relativeFilePath = (directory: string, metaUrl: string): string => {
  const currentModulePath = fileURLToPath(metaUrl);
  const currentDirectory = dirname(currentModulePath);
  return resolve(currentDirectory, directory);
};