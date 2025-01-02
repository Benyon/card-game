import { ANSI } from '@/utils/ansi';
import chalk from 'chalk';

const NUM_OF_LINES = 9;
const MAX_LINES = 9;
const MIN_LINES = 0;

export abstract class Screen {
  abstract update(): void;
  abstract emit(event: string, data?: any): void;

  updateLine(line: number, data: string) {
    if (line > MAX_LINES) throw new Error(`MaxLinesOutOfBoundsError on updateLine, got ${line}`);
    if (line < MIN_LINES) throw new Error(`MinLinesOutOfBoundsError on updateLine, got ${line}`);

    const relativeLineFromTop = (NUM_OF_LINES + 1) - line;
    process.stdout.write(ANSI.MOVE_TO_LINE(relativeLineFromTop));
    process.stdout.write(ANSI.CLEAR_LINE)
    process.stdout.write(data);
    process.stdout.write(ANSI.MOVE_TO_BOTTOM_LINE);
  }

  static processScreen(screenTemplate: string) {
    return screenTemplate.replace(/G/gi, chalk.bgGreen(' ')).split('\n');
  }
}