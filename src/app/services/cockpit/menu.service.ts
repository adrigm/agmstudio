import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private headers = new HttpHeaders({
    'Cockpit-Token': environment.cockpit.token
  });
  private url = `${ environment.cockpit.url }/menu`;

  constructor(
    private http: HttpClient
  ) { }

  public getMenuItems(): Observable<MenuItem[]> {
    const body = {
      simple: 1
    };

    return this.http.post<MenuItem[]>(this.url, body, { headers: this.headers });
  }
}
