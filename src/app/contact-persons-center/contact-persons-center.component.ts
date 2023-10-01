import { Component, Input } from '@angular/core';
import { ContactFormStateService } from '../services/contactFormState.service';
import { ContactPerson, Insured } from '../process-claim/process-claim.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONTACT_PERSON_TYPE, SelectOption } from '../constants/select-options.constants';
// this component is using to manage the contacts and display the count of them.
// we can delete all of only unprefferd and adding insured to the contacts
@Component({
  selector: 'app-contact-persons-center',
  template: `
    <div class="flex justify-center bg-ligthblue">
      <div class="flex justify-end px-8 p-2">
        <span dir="rtl" class="whitespace-nowrap text-2xl font-bold text-blue">ריכוז מידע בתהליך</span>
      </div>
    </div>
    <div  class="flex justify-center px-8 py-8">
      <span dir="rtl" class="whitespace-nowrap flex flex-col px-4">
        <button (click)="resetContacts()" dir="rtl" class="btn">איפוס אנשי קשר</button>

      </span>
      <span dir="rtl" class="whitespace-nowrap flex flex-col px-4">
        <button (click)="fullyResetContacts()" dir="rtl" class="btn">איפוס מלא</button>
      </span>
      <span dir="rtl" class="whitespace-nowrap flex flex-col px-4">
        <button (click)="setInfuredAsContact()" dir="rtl" class="btn">הוספת מבוטח</button>
      </span>
      <span dir="rtl" class="whitespace-nowrap px-4 py-1">פעולות אפשריות:</span>
      <span dir="rtl" class="whitespace-nowrap px-4 py-1 flex">
        מספר אנשי קשר בתהליך:
        <span  dir="rtl" class="whitespace-nowrap flex flex-col px-1">
          {{ (contacts$ | async)?.length }}
        </span>
      </span>
    </div>
  `,
})
export class ContactPersonsCenterComponent {
  @Input() insured!: Insured;  
  contacts$: Observable<ContactPerson[]>; // holds the contacts observable
  contactPersonTypeOptions$ = new BehaviorSubject<SelectOption[]>(CONTACT_PERSON_TYPE);

  constructor(private contactService: ContactFormStateService) {
    this.contacts$ = this.contactService.getContacts();
  }

  // adding the infured to the contacts
  setInfuredAsContact() {
    const options = this.contactPersonTypeOptions$.getValue();
    // geting the type object from the select options for the insured data
    const typeData = options.find((option) => option.code === this.insured.identityType);
    if(typeData){
      this.contactService.addInsured(this.insured, typeData);
    }
  }
  // reset all contacts that are not prefferd
  resetContacts() {
    this.contactService.resetContacts()
  }

  // delete all the contacts
  fullyResetContacts() {
    this.contactService.fullyResetContacts()
  }
}
