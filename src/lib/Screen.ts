import { ANSI } from '@/utils/ansi';

export abstract class Screen {
  abstract onUpdate(): void;
  abstract emit(event: string, data?: any): void;

  updateLine(line: number, data: string) {
    process.stdout.write(ANSI.MOVE_TO_LINE(line));
    process.stdout.write(ANSI.CLEAR_LINE)
    process.stdout.write(data);
    process.stdout.write(ANSI.MOVE_TO_BOTTOM_LINE);
  }

}