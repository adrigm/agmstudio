import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../../services/cockpit/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;
  public loading = false;
  public showOK = false;
  public showKO = false;

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      topic: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  sendForm() {
    this.loading = true;

    this.contactService.sendContactForm(this.contactForm.value)
    .subscribe( resp => {
      this.loading = false;
      this.showOK = true;

      setTimeout(() => {
        this.showOK = false;
      }, 3000);
    },
    error => {
      this.loading = false;
      this.showKO = true;

      setTimeout(() => {
        this.showKO = false;
      }, 3000);
    });
  }

}
