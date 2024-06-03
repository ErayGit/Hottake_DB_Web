import { Component } from '@angular/core';
import {CARDComponent} from "../../card/card.component";
import {FirendsBarComponent} from "../../firends-bar/firends-bar.component";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-feed-page',
  standalone: true,
  imports: [
    CommonModule,
    CARDComponent,
    FirendsBarComponent
  ],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.css',
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}, HttpClientModule]
})
export class FeedPageComponent {
  title = 'Hottake_DB_Web';
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
