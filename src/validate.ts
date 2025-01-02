import chalk, { ChalkInstance } from 'chalk';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { relativeFilePath } from './utils/fs';

// Cards
const CARD_EXPECTED_HEIGHT = 9;
const CARD_EXPECTED_WIDTH = 11;

// Screens
const SCREEN_EXPECTED_HEIGHT = 10;
const SCREEN_EXPECTED_WIDTH = 150;

async function processCardFiles(directory: string): Promise<void> {
  const resolvedPath = relativeFilePath(directory, import.meta.url);
  const entries = await readdir(resolvedPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(resolvedPath, entry.name);
    if (entry.isDirectory()) {
      await processCardFiles(fullPath);
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.card') || entry.name.endsWith('.background')) {
        await validateCard(fullPath);
      }
      if (entry.name.endsWith('.screen')) {
        await validateScreen(fullPath);
      }
    }
  }
}

function validate(maxHeight: number, maxWidth: number, log: ChalkInstance) {
  return async function (filePath: string) {
    const contents = await readFile(filePath, 'utf-8');
    const rows = contents.split('\n');
    console.log(log(`- Checking file ${filePath} where rowLength is ${rows.length} and height is ${rows.reduce((max, obj) => (obj.length > max ? obj : max), rows[0].length)}`))

    if (rows.length !== maxHeight) {
      throw new Error(chalk.red(`The card data for ${filePath} was incorrect - expected rows was ${maxHeight}, but got ${rows.length}`));
    }

    const incorrectColumns = rows.filter((row) => row.length !== maxWidth);
    if (incorrectColumns.length > 0) {
      throw new Error(chalk.red(`The card data for ${filePath} was incorrect - expected columns was ${maxWidth} but found one which was ${incorrectColumns[0].length}`));
    }
  }
}

const validateCard = validate(CARD_EXPECTED_HEIGHT, CARD_EXPECTED_WIDTH, chalk.blue);
const validateScreen = validate(SCREEN_EXPECTED_HEIGHT, SCREEN_EXPECTED_WIDTH, chalk.magenta);

async function main() {
  console.log(chalk.blue('♣️ Validating card data is correct'));
  await processCardFiles('./cards');
  console.log(chalk.green('✔️ Card data is valid\n'));

  console.log(chalk.magenta('⌘ Validating screen data is correct'));
  await processCardFiles('./screens');
  console.log(chalk.green('✔️ Screen data is valid\n'));
}

main();