import { InputController } from '@/lib/InputController';
import { UIFramework } from '@/lib/UIFramework';

interface GameOptions { }

export class Game {
  private inputController: InputController;
  private ui: UIFramework;

  constructor(readonly options: GameOptions) {
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
