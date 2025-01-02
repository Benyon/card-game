import { Game } from '@/lib/Game';

const REQUIRED_CLI_WIDTH = 150;

export class UIFramework {
  private game: Game;

  constructor(game: Game) {
    if (this.game) {
      game.logger.warn('UI framework is already connected.');
      return;
    }
    if (!game.logger) {
      game.logger.warn('No logger found on the game controller, initialise this first.');
      return;
    }
    this.game = game;
    process.stdout.on("resize", () => {
      const terminalWidth = process.stdout.columns;
      if (terminalWidth < REQUIRED_CLI_WIDTH) {
        this.disable();
      }
    });
    game.logger.success('🛠️  UI Framework has been enabled');
  }

  /**
   * Disable visual UI as it cannot be shown within terminal length.
   */
  disable() {
    console.clear();
  }

  /**
   * Take all the state and regenerate the UI.
   */
  reconcile() {

  }
}