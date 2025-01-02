import { InputController } from '@/lib/InputController';
import { UIFramework } from '@/lib/UIFramework';
import { GameLogger } from './GameLogger';
import { Card } from './Card';

interface GameOptions { }

export class Game {
  public logger: GameLogger;
  private inputController: InputController;
  private ui: UIFramework;

  constructor(readonly options: GameOptions) {
    this.logger = new GameLogger();
    this.inputController = new InputController(this);
    this.ui = new UIFramework(this);
  };

  start() {
    this.ui.startMainLoop();
  }

  emit(event: string, data?: any) {
    this.ui.emit(event, data);
  }
}
