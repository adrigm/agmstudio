import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = `${ environment.cockpit.urlCockpit }/image`;

  constructor(
    private http: HttpClient
  ) { }

  public getImageUrl(src: string, width?: number, height?: number): Observable<string> {
    const body = {
      src,
      d: false
    };

    if (width) {
      body['w'] = width;
    }

    if (height) {
      body['h'] = height;
    }

    return this.http.post<string>(this.url, body);
  }
}
