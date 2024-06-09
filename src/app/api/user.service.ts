import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { PostBody } from '../interfaces/post-body';
import {CommentBody} from "../interfaces/comment-body";
import {Comment} from "../models/Comment";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  findAllFollowed(userId: string) {
    return this.http.get<{user: User}[]>(this.baseUrl + `user/${userId}/followed`);
  }

  findAllNotFollowed(userId: string){
    return this.http.get<{user: User}[]>(this.baseUrl + `user/${userId}/notfollowed`);
  }
}
