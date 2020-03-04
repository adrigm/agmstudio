import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SocialLink } from 'src/app/interfaces/social-link.interface';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private url = `${ environment.cockpit.url }/social`;

  constructor(
    private http: HttpClient
  ) { }

  public getSocialLinks(): Observable<SocialLink[]> {
    const body = {
      simple: 1
    };

    return this.http.post<SocialLink[]>(this.url, body);
  }
}
