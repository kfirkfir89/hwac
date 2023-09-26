import { Component, Input } from '@angular/core';
import { ContactPersons } from '../process-claim/process-claim.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONTACT_PERSON_TYPE, SelectOption } from '../constants/select-options.constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactStateService } from '../services/contactState.service';

@Component({
  selector: 'app-contact-persons',
  templateUrl: './contact-persons.component.html',
  styleUrls: ['./contact-persons.component.css']
})
export class ContactPersonsComponent {
  contactForm: FormGroup;
  isNewContact = false;
  contactPersonTypeOptions$ = new BehaviorSubject<SelectOption[]>(CONTACT_PERSON_TYPE);
  contacts$: Observable<ContactPersons[]>; // holds the contacts observable
  constructor(private fb: FormBuilder, private contactService: ContactStateService) {
    this.contacts$ = this.contactService.getContacts();
    this.contactForm = this.fb.group({
      preferred: [false],
      type: [''],
      name: [''],
      address: [''],
      phone: [''],
      email: [''],
    });
  }
  newContact() {
    this.isNewContact = !this.isNewContact;
  }
  addNewContact(): void {
    if (this.contactForm.valid) {
      console.log('contactForm:', this.contactForm?.value)
      this.isNewContact = false;
      const newContact: ContactPersons = this.contactForm.value;
      this.contactService.addContact(newContact);
      this.contactForm.reset();
      this.isNewContact = false;
    } else {
      // Handle form invalid case
    }
  }
  updateDeliveryFlag(contactId: number) {
    this.contactService.updateDeliveryFlag(contactId)
  }

}
