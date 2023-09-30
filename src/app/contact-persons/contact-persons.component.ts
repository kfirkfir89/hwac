import { Component, Input } from '@angular/core';
import { ContactPerson } from '../process-claim/process-claim.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONTACT_PERSON_TYPE, SelectOption } from '../constants/select-options.constants';
import { ContactFormStateService } from '../services/contactFormState.service';
import { PhoneFormatPipe } from '../services/phone-format.pipe';


export interface ContactFormValue {
  preferred: boolean;
  type: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-contact-persons',
  template: `
    <div class="flex justify-center bg-ligthblue">
      <div class="flex justify-end px-8 p-2">
        <span dir="rtl" class="whitespace-nowrap text-2xl font-bold text-blue">אנשי קשר</span>
      </div>
    </div>
    <div class="flex justify-center ">
      <table class="container bg-gray" dir="rtl" border="1">
        <thead>
          <tr>
            <th>מועדף</th>
            <th>שם איש קשר</th>
            <th>סוג</th>
            <th>כתובת</th>
            <th>טלפון נייד</th>
            <th>דוא"ל</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let contact of contacts$ | async">
            <td><input (change)="updateDeliveryFlag(contact.id)" [checked]="contact.deliveryFlag || false" type="checkbox"></td>
            <td>{{contact.name}}</td>
            <td>{{contact.type.value}}</td>
            <td>{{contact.address}}</td>
            <td>{{contact.phoneNumber}}</td>
            <td>{{contact.email}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <app-contact-form *ngIf="isNewContact | async"/>
    <a (click)="createNewContact()" dir="rtl" class="whitespace-nowrap flex flex-col px-4 anchor-btn">
      הוסף איש קשר  
    </a>
  `,
})
export class ContactPersonsComponent {
  contactPersonTypeOptions$ = new BehaviorSubject<SelectOption[]>(CONTACT_PERSON_TYPE);
  contacts$: Observable<ContactPerson[]>; // holds the contacts observable
  isNewContact = this.contactFormStateService.isNewContact$;
  constructor( private contactFormStateService: ContactFormStateService, private phoneFormatPipe: PhoneFormatPipe // Injecting the pipe here
  ) {
    this.contacts$ = this.contactFormStateService.getPipedContacts();
  }

  updateDeliveryFlag(id: number){
    this.contactFormStateService.updateDeliveryFlag(id);
  }
  createNewContact() {
    this.contactFormStateService.newContact();
  }

}
