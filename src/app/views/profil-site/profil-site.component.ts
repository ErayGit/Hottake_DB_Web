import { Component } from '@angular/core';
import { FirendsBarComponent } from "../feed-page/firends-bar/firends-bar.component";
import { CARDComponent } from "../feed-page/card/card.component";

@Component({
    selector: 'app-profil-site',
    standalone: true,
    templateUrl: './profil-site.component.html',
    styleUrl: './profil-site.component.css',
    imports: [FirendsBarComponent, CARDComponent]
})
export class ProfilSiteComponent {
    items = fetchData();


}



function fetchData() {
    return [
      {
        id: 1,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 4,
          thirdEmojie: 8,
          fourEmojie: 5,
        },
      },
      {
        id: 2,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#2bbdb8',
        emojie: '👌',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 2,
          thirdEmojie: 4,
          fourEmojie: 1,
        },
      },
      {
        id: 3,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '✌',
        komentar: {
          firstEmojie: 5,
          secondEmojie: 3,
          thirdEmojie: 2,
          fourEmojie: 2,
        },
      },
      {
        id: 4,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👨‍🦰',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
      {
        id: 5,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#4b3f75',
        emojie: '✋',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 13,
          thirdEmojie: 8,
          fourEmojie: 12,
        },
      },
      {
        id: 6,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#bdb52b',
        emojie: '👮‍♂️',
        komentar: {
          firstEmojie: 13,
          secondEmojie: 3,
          thirdEmojie: 38,
          fourEmojie: 2,
        },
      },
      {
        id: 7,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
      {
        id: 8,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
      {
        id: 9,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
      {
        id: 10,
        Text: 'Lorum Ipsum mit 5 Worten etc.',
        color: '#38cf60',
        emojie: '👍',
        komentar: {
          firstEmojie: 3,
          secondEmojie: 3,
          thirdEmojie: 8,
          fourEmojie: 2,
        },
      },
    ];
  }
  