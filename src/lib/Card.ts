import chalk, { ChalkInstance } from 'chalk';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const suitInfo: { [key in Card.Suit]: { icon: string, colour: ChalkInstance } } = {
  Clubs: { icon: '♣', colour: chalk.blue },
  Diamonds: { icon: '♦', colour: chalk.yellow },
  Hearts: { icon: '♥', colour: chalk.red },
  Spades: { icon: '♠', colour: chalk.black },
}

export class Card {
  // Gameplay Data
  private modifier: Card.Modifier = 'None';
  private edition: Card.Edition = 'Base';
  private stamp: Card.Stamp = 'None';
  private sticker: Card.Sticker = 'None';
  private cardData: Card.Data;

  // UI Data
  private suitColour: ChalkInstance;
  private imageData: string[];
  private backgroundData: string[];

  constructor(readonly rank: Card.Rank, readonly suit: Card.Suit) {
    const { icon, colour } = suitInfo[suit];
    const currentDir = dirname(fileURLToPath(import.meta.url));
    const imageFilePath = resolve(currentDir, `../cards/deck/${rank}/card.ascii`);
    const backgroundFilePath = resolve(currentDir, `../cards/deck/${rank}/card.background`);
    const dataFilePath = resolve(currentDir, `../cards/deck/${rank}/data.json`);

    this.cardData = JSON.parse(readFileSync(dataFilePath, 'utf-8'));
    this.imageData = readFileSync(imageFilePath, 'utf-8').replace(/(\?)/gi, icon).split('\n');
    this.backgroundData = readFileSync(backgroundFilePath, 'utf-8').split('\n');
    this.suitColour = colour;
  }

  setModifier(modifier: Card.Modifier) {
    this.modifier = modifier;
  }

  setEdition(edition: Card.Edition) {
    this.edition = edition;
  }

  addStamp(stamp: Card.Stamp) {
    this.stamp = stamp;
  }

  addSticker(sticker: Card.Sticker) {
    this.sticker = sticker;
  }

  img() {
    return this.imageData.join('\n');
  }
}