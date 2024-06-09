import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { File } from '../models/File';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  addImage(formData: FormData): Observable<HttpResponse<{file: File}>> {
    return this.http.post<any>(this.baseUrl + 'file', formData, {
      observe: 'response',
    });
  }

  deleteImage(fileId: string) {
    return this.http.delete(this.baseUrl + `file/${fileId}`);
  }

  getImageBlob(fileId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `file/${fileId}`);
  }

  getImageFile(fileId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `file/${fileId}/download`, {
      responseType: "blob" as "json",
    });
  }
}
