import chalk from 'chalk';

export class GameLogger {
  warn(message: string) {
    console.log(chalk.yellow(message));
  }

  success(message: string) {
    console.log(chalk.green(message));
  }

  info(message: string) {
    console.log(chalk.magenta(message));
  }
}