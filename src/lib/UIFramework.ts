import { Game } from '@/lib/Game';
import { Screen } from './Screen';
import { MenuScreen } from '@/screens/Menu';
import { ANSI } from '@/utils/ansi';
import chalk from 'chalk';

const REQUIRED_CLI_WIDTH = 150;

function onResize() {
  const terminalWidth = process.stdout.columns;
  if (terminalWidth < REQUIRED_CLI_WIDTH) {
    // TODO: Disable UI.
  }
}

export class UIFramework {
  private game: Game;
  private currentScreen: Screen;
  private currentLoop: NodeJS.Timeout = null;

  constructor(game: Game) {
    this.game = game;
    this.currentScreen = new MenuScreen();
    process.stdout.on("resize", onResize);
    console.log(chalk.yellow('⌘ UI Framework has been enabled'));
  }

  startMainLoop() {
    if (this.currentLoop) {
      throw new Error('Attempted to start game loop while game is in session.');
    }

    // Clear the playing area and clear cursor.
    console.log('_'.repeat(150), '\n');
    console.log([...Array(9)].map((_, i) => i + 1).join('\n'));
    process.stdout.write(ANSI.HIDE_CURSOR);

    // Start gameplay loop.
    this.currentLoop = setInterval(() => this.update(), 1000 / 24);
  }

  stopMainLoop() {
    if (!this.currentLoop) return;
    clearInterval(this.currentLoop);
    this.currentLoop = null;
  }

  update() {
    this.currentScreen.update();
  }

  emit(event: string, data?: any) {
    this.currentScreen.emit(event, data);
  }
}