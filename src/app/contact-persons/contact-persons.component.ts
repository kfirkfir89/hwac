import { Component, Input } from '@angular/core';
import { ContactPersons } from '../process-claim/process-claim.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { CONTACT_PERSON_TYPE, SelectOption } from '../constants/select-options.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  templateUrl: './contact-persons.component.html',
  styleUrls: ['./contact-persons.component.css']
})
export class ContactPersonsComponent {
  contactForm: FormGroup;
  isNewContact = false;
  contactPersonTypeOptions$ = new BehaviorSubject<SelectOption[]>(CONTACT_PERSON_TYPE);
  contacts$: Observable<ContactPersons[]>; // holds the contacts observable
  constructor(private fb: FormBuilder, private contactService: ContactFormStateService, private phoneFormatPipe: PhoneFormatPipe // Injecting the pipe here
  ) {
    this.contacts$ = this.contactService.getPipedContacts();
    this.contactForm = this.fb.group({
      preferred: false,
      type: ['', Validators.required ],
      name: ['', [Validators.required, Validators.pattern('[א-ת ]+')]],
      address: [''],
      phone: ['', [Validators.required, Validators.pattern('0[0-9]{2}-[0-9]{7}$')]],
      email: ['', Validators.email],
    });
    
  }
  
  newContact() {
    this.isNewContact = !this.isNewContact;
    this.resetForm();  
  }
  addNewContact(): void {
    if (this.contactForm.valid) {
      const formValue: ContactFormValue = this.contactForm.value;
      const contactTypeOptions = this.contactPersonTypeOptions$.getValue();
      const contacts = this.contactService.getContactsArray();
      const nextId = contacts.length + 1; // taking the next id for the new contact
      console.log('formValue:', formValue, contactTypeOptions)
      const contactType: SelectOption = contactTypeOptions.find((option) => option.code === +formValue.type)!
      const newContact: ContactPersons = {
        id: nextId,
        deliveryFlag: formValue.preferred,
        type: {code: contactType.code, value:contactType.value},
        name: formValue.name,
        phoneNumber: this.phoneFormatPipe.transform(formValue.phone) as number,
        email: formValue.email,
        address: formValue.address
      }
      console.log('newContact:', newContact)
      this.contactService.addContact(newContact);
      // Now store formValue which has the transformed phone number.
      // this.contactService.addContact(formValue)
    } else {
      alert('The form is invalid!');
    }
  }

  updateDeliveryFlag(contactId: number) {
    this.contactService.updateDeliveryFlag(contactId)
  }
  resetForm(){
    this.contactForm.reset()
  }
}
