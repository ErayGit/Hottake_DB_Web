import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { PostBody } from '../interfaces/post-body';
import {CommentBody} from "../interfaces/comment-body";
import {Comment} from "../models/Comment";

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  addComment(commentBody: CommentBody): Observable<HttpResponse<{comment: Comment}>> {
    return this.http.post<any>(this.baseUrl + 'comment', commentBody, {
      observe: 'response',
    });
  }

  findAllFromPost(postId: string) {
    return this.http.get<{comment: Comment}[]>(this.baseUrl + `comment/${postId}/post`);
  }
}
