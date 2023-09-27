import { Component, Input } from '@angular/core';
import { ContactFormStateService } from '../services/contactFormState.service';
import { ContactPersons, Insured } from '../process-claim/process-claim.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONTACT_PERSON_TYPE, SelectOption } from '../constants/select-options.constants';

@Component({
  selector: 'app-contact-persons-center',
  templateUrl: './contact-persons-center.component.html',
  styleUrls: ['./contact-persons-center.component.css']
})
export class ContactPersonsCenterComponent {
  @Input() insured!: Insured;  
  contacts$: Observable<ContactPersons[]>; // holds the contacts observable
  contactPersonTypeOptions$ = new BehaviorSubject<SelectOption[]>(CONTACT_PERSON_TYPE);

  constructor(private contactService: ContactFormStateService) {
    this.contacts$ = this.contactService.getContacts();
  }

  setInfuredAsContact() {
    // createing the type object
    const options = this.contactPersonTypeOptions$.getValue();
    const typeData = options.find((option) => option.code === this.insured.identityType);
    console.log('typeData:', typeData)
    const insuredAsContact: ContactPersons = {
      id: this.insured.identity,
      deliveryFlag: true,
      type: typeData!,
      name: `${this.insured.firstName} ${this.insured.lastName}`,
      phoneNumber: 0,
      email: '',
      address: `${this.insured.address.streetName},${this.insured.address.cityName}`,
    }
    this.contactService.addInsured(insuredAsContact);
  }

  resetContacts() {
    this.contactService.resetContacts()
  }

  fullyResetContacts() {
    this.contactService.fullyResetContacts()
  }
}
