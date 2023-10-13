import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImgClientService {
  constructor(private http: HttpClient) {}
  getDefaultImageAsFile(): Observable<File> {
    return this.http
      .get('assets/imgs/canbo.png', { responseType: 'blob' })
      .pipe(
        map((blob: BlobPart) => {
          const fileName = 'canbo.png';
          return new File([blob], fileName);
        })
      );
  }
}
