import {HttpClient, HttpResponse, } from "@angular/common/http";
import {environment} from "../../environment";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, } from "rxjs";
import {Post} from "../models/Post";

@Injectable({
  providedIn: "root",
})

export class PostService {
  private readonly baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  addPost(formData: FormData): Observable<HttpResponse<Post>> {
    return this.http.post<any>(
      this.baseUrl + 'post',
      formData,
      {
        observe: "response",
      },
    );
  }

  findAllFromFollowed(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + `post/${userId}/feed`)
  }

  findAllFromUser(userId: string) {
    return this.http.get<Post[]>(this.baseUrl + `post/${userId}/user`)
  }
}
