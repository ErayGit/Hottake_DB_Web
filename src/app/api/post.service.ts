import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { environment } from '../../environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { PostBody } from '../interfaces/post-body';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  addPost(postBody: PostBody): Observable<HttpResponse<Post>> {
    return this.http.post<any>(this.baseUrl + 'post', postBody, {
      observe: 'response',
    });
  }

  countAllFromFollowed(userId: string): Observable<{count: number}> {
   return this.http.get<{count: number}>(this.baseUrl + `post/${userId}/countfeed`);
  }

  countAllFromUser(userId: string): Observable<{count: number}> {
    return this.http.get<{count: number}>(this.baseUrl + `post/${userId}/countuser`);
  }

  findAllFromFollowed(userId: string, page: number): Observable<Post[]> {
    const limit = 10;
    const skip = 10 * page;
    let params: HttpParams = new HttpParams();
    params = params.set('skip', skip);
    params = params.set('limit', limit);
    return this.http.get<Post[]>(this.baseUrl + `post/${userId}/feed`, {params: params});
  }

  findAllFromUser(userId: string, page: number) {
    const limit = 10;
    const skip = 10 * page;
    let params: HttpParams = new HttpParams();
    params = params.set('skip', skip);
    params = params.set('limit', limit);
    return this.http.get<Post[]>(this.baseUrl + `post/${userId}/user`, {params: params});
  }
}
