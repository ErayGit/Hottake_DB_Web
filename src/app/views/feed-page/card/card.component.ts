import {Component, Input, OnInit} from '@angular/core';
import {FileService} from "../../../api/file.service";
import {Post} from "../../../models/Post";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {Comment, Emoji} from "../../../models/Comment";
import {TuiButtonModule} from "@taiga-ui/core";
import {CommentService} from "../../../api/comment.service";
import {AuthService} from "../../../api/auth.service";
import {PushService, pushTypes} from "../../../services/push.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TuiButtonModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})

export class CARDComponent implements OnInit{
  constructor(
    private fileService: FileService,
    private commentService: CommentService,
    private authService: AuthService,
    private pushService: PushService,
              ) {

  }
  @Input()
  item: any;
  prayerCount: number = 0;
  laughingCount: number = 0;
  cryingCount: number = 0;
  postImage: any;
  userImage: any;

  getImageForCard() {
    this.fileService.getImageFile((this.item as Post).fileId!).subscribe((res) => {
      const reader = new FileReader();
            reader.onloadend = () => {
        this.postImage = reader.result as string;
      };
      reader.readAsDataURL(res);
    });
  }

  getImageForUser() {
    this.fileService.getImageFile((this.item as Post).user!.fileId!).subscribe((res) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.userImage = reader.result as string;
      };
      reader.readAsDataURL(res);
    });
  }

  getComments() {
    this.commentService.findAllFromPost(this.item.id).subscribe((res) => {
      if(res.length !== 0) {
        this.laughingCount = 0;
        this.cryingCount = 0;
        this.prayerCount = 0;
        res.map(
          (comment: {comment: Comment}) => {
            switch (comment.comment.emoji) {
              case Emoji.LAUGHING:
                this.laughingCount = this.laughingCount + 1;
                break;

              case Emoji.CRYING:
                this.cryingCount = this.cryingCount + 1;
                break;

              case Emoji.PRAYER:
                this.prayerCount = this.prayerCount + 1;
                break;
            }
          }
        )
      }
    })
  }

  clickEmojiButton(emojiType: Emoji) {
    this.commentService.addComment({
      text: 'empty',
      emoji: emojiType,
      creatorId: this.authService.getLoggedInUser()?.id!,
      postId: this.item.id
    }).subscribe((res) => {
      if(res) {
        this.pushService.sendPush(pushTypes.SUCCESS);
        this.getComments();
        return;
      } else {
        this.pushService.sendPush(pushTypes.ERROR);
      }
    })
  }

  countComments(comments: Comment[]) {
    this.laughingCount = 0;
    this.cryingCount = 0;
    this.prayerCount = 0;
    comments.map(
      (comment: Comment) => {
        switch (comment.emoji) {
          case Emoji.LAUGHING:
            this.laughingCount = this.laughingCount + 1;
            break;

            case Emoji.CRYING:
              this.cryingCount = this.cryingCount + 1;
              break;

              case Emoji.PRAYER:
            this.prayerCount = this.prayerCount + 1;
            break;
        }
      }
    );
  }

  ngOnInit(): void {
    this.getImageForCard();
    this.getImageForUser();
    this.countComments(this.item.comments);
  }

  protected readonly Emoji = Emoji;
}
