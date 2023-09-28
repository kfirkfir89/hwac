import { Component } from '@angular/core';
import { ContactFormStateService } from '../services/contactFormState.service';

@Component({
  selector: 'app-contact-form',
  template: `

  <div>
  <table class="container bg-gray" dir="rtl" border="1">
    <thead>
        </thead>
        <tbody>
          <tr >
            <td>
              <form [formGroup]="contactForm">
                <input type="checkbox" formControlName="preferred"/>
              </form>
            </td>
            <td>
              <form [formGroup]="contactForm">
                <input type="text" class="input-text" formControlName="name"/>
              </form>
            </td>
            <td>
              <form [formGroup]="contactForm">
                <select formControlName="type" dir="rtl" class=" p-1" [value]="contactPersonTypeOptions | async">
                  <option value=""  selected hidden></option>
                  <option [value]="option.code" *ngFor="let option of contactPersonTypeOptions | async">
                    {{ option.value }}
                  </option>
                </select>
              </form>
            </td>
            <td>
              <form [formGroup]="contactForm">
                <input type="text" class="input-text" formControlName="address"/>
              </form>
            </td>
            <td>
              <form [formGroup]="contactForm">
                <input type="text" class="input-text" formControlName="phone" maxLength="11" />
              </form>
            </td>
            <td class="flex">
              <form [formGroup]="contactForm">
                <input type="text" class="input-text" formControlName="email"/>
              </form>
              <button class="btn-add" (click)="addNewContact()">+</button>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
    

  `,
})
export class ContactFormComponent {
  constructor(private contactFormStateService: ContactFormStateService) {}
  isNewContact = this.contactFormStateService.isNewContact$;
  contactForm = this.contactFormStateService.contactForm;
  contactPersonTypeOptions = this.contactFormStateService.contactPersonTypeOptions$;

  addNewContact() {
    this.contactFormStateService.addNewContact();
  }
  createNewContact() {
    this.contactFormStateService.newContact();
  }
}
