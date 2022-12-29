import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Test } from '../models/test';
import { Upload } from '../models/upload';
import { UploadList } from '../models/uploadList';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  getTest(): Observable<Test> {
    return this.httpClient.get<Test>(
      `https://localhost:7154/Upload/test`
    );
  }

  upload(chunk: Blob, upload: Upload): Observable<any> {
    const data = new FormData();
    data.append('file', chunk);
    data.append('body', JSON.stringify(upload));
    return this.httpClient.post<any>(
      `https://localhost:7154/Upload/block`,
      data,
      {
        reportProgress: true,
        observe: 'events',
        responseType: 'json',
      }
    );
  }

  uploadList(blockList:UploadList): Observable<any> {
    const data = new FormData();
    data.append('body', JSON.stringify(blockList));
    return this.httpClient.post<any>(
      `https://localhost:7154/Upload/blockList`,
      data,
      {
        reportProgress: true,
        observe: 'events',
        responseType: 'json',
      }
    );
  }

}

