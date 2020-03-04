import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private url = `${ environment.cockpit.url }/config`;

  constructor(
    private http: HttpClient
  ) { }

  public getConfig() {
    const body = {
      simple: 1
    };

    return this.http.post(this.url, body);
  }
}
