import {Component, Input, OnInit} from '@angular/core';
import {FileService} from "../../../api/file.service";
import {Post} from "../../../models/Post";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CARDComponent implements OnInit{
  constructor(private fileService: FileService,) {

  }
  @Input() item: any;
  postImage: any;


  getImageForCard() {
    this.fileService.getImageFile((this.item as Post).fileId!).subscribe((res) => {
      const reader = new FileReader();
      console.log(res);
      reader.onloadend = () => {
        this.postImage = reader.result as string;
      };
      reader.readAsDataURL(res);
    });
  }

  ngOnInit(): void {
    this.getImageForCard();
  }
}
