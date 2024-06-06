import { Component, OnInit } from '@angular/core';
import { CARDComponent } from './card/card.component';
import { FirendsBarComponent } from './firends-bar/firends-bar.component';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileService } from '../../api/file.service';
import { AuthService } from '../../api/auth.service';
import { PushService } from '../../services/push.service';
import { PostService } from '../../api/post.service';
import { Post } from '../../models/Post';
import { TuiInputModule } from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed-page',
  standalone: true,
  imports: [
    CommonModule,
    CARDComponent,
    FirendsBarComponent,
    ReactiveFormsModule,
    TuiInputModule,
  ],
  templateUrl: './feed-page.component.html',
  styleUrl: './feed-page.component.css',
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    HttpClientModule,
  ],
})
export class FeedPageComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private postService: PostService,
    private authService: AuthService,
    private pushService: PushService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  title = 'Hottake_DB_Web';
  items: Post[] = [];

  addPostForm = new FormGroup({
    testValue: new FormControl(''),
  });

  readonly palette = defaultEditorColors;

  addPost() {}

  fetchData() {
    let userId = '54d2abbd-2376-11ef-a4b9-02420a000403';
    //TODO use loggedIn UserId
    //if (this.authService.isLoggedIn()) {
    //    userId = this.authService.getLoggedInUser().id
    // }
    //TODO Switch with from followed
    return this.postService.findAllFromUser(userId).subscribe((posts) => {
      this.items = posts;
    });
    /*
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

     */
  }
}
