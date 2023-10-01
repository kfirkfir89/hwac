import { Component } from '@angular/core';
import { ContactPerson } from '../process-claim/process-claim.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONTACT_PERSON_TYPE, SelectOption } from '../constants/select-options.constants';
import { ContactFormStateService } from '../services/contactFormState.service';
import { PhoneFormatPipe } from '../services/phone-format.pipe';
// `ContactPersonsComponent` serves as a UI component to display and manage a list of contact persons.
// it provides functionalities such as viewing contact details, updating the preferred contact, 
// and initiating the creation of a new contact.
// the component interacts with `ContactFormStateService` to manage the state and properties of contacts.
// it also injects `PhoneFormatPipe` (though it is not utilized in the provided snippet) presumably to 
// format the phone numbers displayed.
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
    <a (click)="updateIsNewContact()" dir="rtl" class="whitespace-nowrap flex flex-col px-4 anchor-btn">
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
    // Initializing contacts observable 
    // we are getting a piped contacts because of the phone number that need to be display as string format
    this.contacts$ = this.contactFormStateService.getPipedContacts();
  }

  // updating the prefferd flag
  updateDeliveryFlag(id: number){
    this.contactFormStateService.updateDeliveryFlag(id);
  }
  // display the form for adding new Contact
  updateIsNewContact() {
    this.contactFormStateService.isNewContact();
  }

}
