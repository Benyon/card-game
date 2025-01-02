import { Game } from '@/lib/Game.js';

export class InputController {
  private game: Game;

  constructor(game: Game) {
    if (this.game) {
      game.logger.warn('Controller is already connected.');
      return;
    }
    if (!game.logger) {
      game.logger.warn('No logger found on the game controller, initialise this first.');
      return;
    }

    this.game = game;
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', this.handleKeyPress.bind(this));
    this.game.logger.success('🎮 Input controller has been enabled');
  }

  private handleKeyPress(key: Buffer): void {
    const keyString = key.toString();

    const keyMap: Record<string, () => void> = {
      '\u001B\u005B\u0041': () => this.game.up(),    // Up arrow
      '\u001B\u005B\u0042': () => this.game.down(),  // Down arrow
      '\u001B\u005B\u0044': () => this.game.left(),  // Left arrow
      '\u001B\u005B\u0043': () => this.game.right(), // Right arrow
      'w': () => this.game.up(),
      's': () => this.game.down(),
      'a': () => this.game.left(),
      'd': () => this.game.right(),
      '\u0003': () => process.exit()
    };

    const action = keyMap[keyString];
    if (!action) {
      console.log(`Unrecognized keypress: ${keyString}`);
      return;
    }

    action();
  }
}