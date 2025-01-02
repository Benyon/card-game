import chalk from 'chalk';
import { readdir, readFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentFilePath = fileURLToPath(import.meta.url); // Full file path
const currentDirPath = dirname(currentFilePath); // Directory of the file

const EXPECTED_HEIGHT = 9;
const EXPECTED_WIDTH = 11;

async function processCardFiles(directory: string): Promise<void> {

  const resolvedPath = resolve(currentDirPath, directory);
  const entries = await readdir(resolvedPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(resolvedPath, entry.name);

    if (entry.isDirectory()) {
      await processCardFiles(fullPath);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.card') || entry.name.endsWith('.background')) {
        await validateFile(fullPath);
      }
    }
  }
}

async function validateFile(filePath: string): Promise<void> {
  const contents = await readFile(filePath, 'utf-8');
  const rows = contents.split('\n');
  if (rows.length !== EXPECTED_HEIGHT) {
    throw new Error(`The card data for ${filePath} was incorrect - expected rows was ${EXPECTED_HEIGHT}, but got ${rows.length}`);
  }
  const incorrectColumns = rows.filter((row) => row.length !== EXPECTED_WIDTH);
  if (incorrectColumns.length) {
    throw new Error(`The card data for ${filePath} was incorrect - expected columns was ${EXPECTED_WIDTH} but found one which was ${incorrectColumns[0].length} `);
  }
}

console.log(chalk.blue('♣️ Validating card data is correct'));
processCardFiles('./cards');
console.log(chalk.green('✔️ Card data is valid'));