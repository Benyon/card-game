import { Screen } from '@/lib/Screen';
import { relativeFilePath } from '@/utils/fs';
import { readFileSync } from 'fs';
import playInstructions from './play.instructions';
import quitInstructions from './quit.instructions';

type ScreenState = 'Play' | 'Quit';

const screenTemplates: { [key in ScreenState]: { template: string, instructions: Function } } = {
  Play: { template: readFileSync(relativeFilePath('./play.screen', import.meta.url), 'utf-8'), instructions: playInstructions },
  Quit: { template: readFileSync(relativeFilePath('./quit.screen', import.meta.url), 'utf-8'), instructions: quitInstructions },
}

export class MenuScreen extends Screen {
  private screenState: ScreenState = 'Play';

  update(): void {
    const currentScreenTemplate = screenTemplates[this.screenState];
    let processedScreen = Screen.processScreen(currentScreenTemplate.template);
    if (currentScreenTemplate.instructions) {
      processedScreen = currentScreenTemplate.instructions(processedScreen);
    }
    processedScreen.forEach((screenRow, i) => {
      this.updateLine(i, screenRow);
    })
  }

  emit(event: string, data?: any): void {
    const events = [
      { condition: () => event === 'keydown' && data === 'up', trigger: () => this.selectOption('Play') },
      { condition: () => event === 'keydown' && data === 'down', trigger: () => this.selectOption('Quit') },
      { condition: () => event === 'keydown' && data === 'submit', trigger: () => this.submit() }
    ]
    const foundEvent = events.find((e) => e.condition());
    if (!foundEvent) return;
    foundEvent.trigger();
  }

  selectOption(option: ScreenState) {
    this.screenState = option;
  }

  submit() {
    if (this.screenState === 'Play') {
      // move screen on
    }
    if (this.screenState === 'Quit') {
      console.clear();
      console.log('Thanks for playing!');
      process.exit();
    }
  }
}