import { Component } from '@angular/core';
import { ContactFormStateService } from '../services/contactFormState.service';

//  the ContactFormComponent is a presentational component that provides 
//  a form interface for creating and managing contact persons. 
//  it allows users to input details of a contact person such as name, 
//  type, address, phone, and email, and then add the contact person 
//  using the provided form controls. 
//  the component utilizes ContactFormStateService to manage the form state, 
//  and obtain necessary data like contactPersonTypeOptions.
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

  // add new contact(submit handler)
  addNewContact() {
    this.contactFormStateService.addNewContact();
  }
}
