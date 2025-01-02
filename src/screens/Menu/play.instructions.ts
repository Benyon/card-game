import chalk from 'chalk';

export default function (screenTemplate: string[]) {
  return screenTemplate.map((row, i) => row
    .replace('> Play', chalk.green('> Play'))
    .replace('> Quit', chalk.dim('> Quit'))
    .replace('Jordan Benyon', chalk.dim('Jordan Benyon'))
    .replace(/[_|\\\|\/\)\()\'\,\`]/g, (match) => chalk.rgb(255 - ((i + 1) * 10), 0, 50 + (i * 12))(match))
  );
}