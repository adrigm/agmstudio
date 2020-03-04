import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CockpitInterceptorService implements HttpInterceptor {
  private headers = new HttpHeaders({
    'Cockpit-Token': environment.cockpit.token
  });

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({ headers: this.headers });

    return next.handle(newReq);
  }
}
