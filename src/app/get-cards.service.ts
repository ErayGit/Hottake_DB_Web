import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetCardsService {
  userCards = [Card];
  followersCards = [Card];

  constructor() {}

  addUserCard() {
    this.userCards.push(
      new Card(
        'Ich bin ein Satz',
        'red',
        '😀',
        'Artist',
        'Song',
        'https://www.w3schools.com/w3images/lights.jpg'
      )
    );
  }
}
