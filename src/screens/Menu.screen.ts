import { Screen } from '@/lib/Screen';

export class MenuScreen extends Screen {
  onUpdate(): void {
    this.updateLine(2, Math.random().toString())
  }

  emit(event: string, data?: any): void {

  }
}