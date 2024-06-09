import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { File } from '../models/File';
import {Post} from "../models/Post";

@Injectable({
  providedIn: 'root',
})
export class AudiodbService {
  //For Reference https://www.theaudiodb.com/api_guide.php?ref=public_apis

  private readonly baseUrl = 'www.theaudiodb.com/api/v1/json/2/';

  constructor(private http: HttpClient, private router: Router) {}

  searchForSong(artistName: string, songName: string): Observable<HttpResponse<Post>> {
    return this.http.get<any>(this.baseUrl + 'searchtrack.php?s=' + artistName + '&t=' + songName);
  }
}
