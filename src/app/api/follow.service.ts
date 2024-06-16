import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { PostBody } from '../interfaces/post-body';
import {FollowBody} from "../interfaces/follow-body";
import {Follow} from "../models/follow";

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  addFollow(followBody: FollowBody): Observable<HttpResponse<Follow>> {
    return this.http.post<any>(this.baseUrl + 'follow', followBody, {
      observe: 'response',
    });
  }

  deleteFollow(followerId: string, followedId: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `follow/${followerId}/${followedId}`, )
  }
}
