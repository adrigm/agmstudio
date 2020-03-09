import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${ environment.cockpit.urlCockpit }/listUsers`;

  constructor(
    private http: HttpClient
  ) { }

  public getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  public getUserById(id: string): Observable<User> {
    const body = {
      filter: {
        _id: id
      }
    };

    return this.http.post<User[]>(this.url, body)
    .pipe(
      map(users => users[0])
    );
  }
}
