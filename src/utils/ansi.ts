// ANSI escape sequences

export const ANSI = {
  MOVE_TO_LINE: (line: number) => `\u001b[${line}F`,
  MOVE_TO_BOTTOM_LINE: '\u001b[999B',
  CLEAR_LINE: '\u001b[2K',
  HIDE_CURSOR: '\u001b[?25l'
}