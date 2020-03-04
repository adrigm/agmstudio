import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm } from '../../interfaces/contact-form.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = `${ environment.cockpit.urlForms }/contact`;

  constructor(
    private http: HttpClient
  ) { }

  sendContactForm(dataForm: ContactForm): Observable<ContactForm> {
    const body = {
      form: {
        ...dataForm
      }
    };

    return this.http.post<ContactForm>(this.url, body);
  }
}
