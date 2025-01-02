declare namespace Card {
  type Rank =
    | 'Ace'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | 'Jack'
    | 'Queen'
    | 'King'

  type Suit =
    | 'Spades'
    | 'Clubs'
    | 'Hearts'
    | 'Diamonds'

  type Modifier =
    | 'None'
    | 'Steel'
    | 'Gold'

  type Edition =
    | 'Base'
    | 'Foil'
    | 'Holographic'
    | 'Polychrome'
    | 'Negative'

  type Stamp =
    | 'None'
    | 'Red'
    | 'Gold'
    | 'Purple'
    | 'Blue'

  type Sticker =
    | 'None'
    | 'Eternal'
    | 'Perishable'
    | 'Rental'

  interface Data {
    value: number;
  }

}
