import { InputController } from '@/lib/InputController';
import { UIFramework } from '@/lib/UIFramework';
import { GameLogger } from './GameLogger';

enum GameStates {
  Preboot = 'DISABLED',
  Menu = 'MENU',
}

interface GameOptions {

}

export class Game {
  public gameState = GameStates.Preboot;
  public logger: GameLogger;
  private inputController: InputController;
  private ui: UIFramework;

  constructor(readonly options: GameOptions) {
    this.logger = new GameLogger();
    this.inputController = new InputController(this);
    this.ui = new UIFramework(this);
    console.log(this);
  };

  start() {
    this.gameState = GameStates.Menu;
  }

  up() {
    this.logger.info('Up!');
    this.ui.reconcile();
  }

  down() {
    this.logger.info('Down!');
    this.ui.reconcile();
  }

  left() {
    this.logger.info('Left!');
    this.ui.reconcile();
  }

  right() {
    this.logger.info('Right!');
    this.ui.reconcile();
  }
}
