import { Game } from '@/lib/Game.js';
import chalk from 'chalk';

export class InputController {
  private game: Game;

  constructor(game: Game) {
    if (this.game) {
      console.warn(chalk.yellow('Controller is already connected.'));
      return;
    }

    this.game = game;
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', this.handleKeyPress.bind(this));
    console.log(chalk.yellow('⏏ Input controller has been enabled'));
  }

  private handleKeyPress(key: Buffer): void {
    const keyString = key.toString();

    const keyMap: Record<string, () => void> = {
      '\u001B\u005B\u0041': () => this.game.emit('keydown', 'up'),    // Up arrow
      '\u001B\u005B\u0042': () => this.game.emit('keydown', 'down'),  // Down arrow
      '\u001B\u005B\u0044': () => this.game.emit('keydown', 'left'),  // Left arrow
      '\u001B\u005B\u0043': () => this.game.emit('keydown', 'right'), // Right arrow
      ' ': () => this.game.emit('keydown', 'submit'),                 // Space bar
      '\r': () => this.game.emit('keydown', 'submit'),                // Enter
      'w': () => this.game.emit('keydown', 'up'),
      's': () => this.game.emit('keydown', 'down'),
      'a': () => this.game.emit('keydown', 'left'),
      'd': () => this.game.emit('keydown', 'right'),
      '\u0003': () => process.exit()
    };

    const action = keyMap[keyString];
    if (!action) return;
    action();
  }
}