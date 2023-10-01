
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,Subject, map, take } from 'rxjs';
import { ContactPerson, Insured } from '../process-claim/process-claim.component';
import { PhoneFormatPipe } from './phone-format.pipe';
import { FormBuilder, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { CONTACT_PERSON_TYPE, SelectOption } from '../constants/select-options.constants';
// this service handle all the contacts methods and funcunality of the form, table, contacts array state.
export interface ContactForm {
  preferred: boolean;
  type: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class ContactFormStateService {
  contactForm: FormGroup;
  formData$: BehaviorSubject<ContactForm>;

  // injecting dependencies
  constructor(private fb: FormBuilder, private phoneFormatPipe: PhoneFormatPipe) {
    this.contactForm = this.fb.group({
      preferred: false,
      type: ['', Validators.required ],
      name: ['', [Validators.required, Validators.pattern("[א-ת']+([ ]+[א-ת']*)*")]],
      address: [''],
      phone: ['', [Validators.required, Validators.pattern('0[0-9]{2}-[0-9]{7}$')]],
      email: ['', Validators.email],
    });

    // initializing the form data with the form group value and validators
    this.formData$ = new BehaviorSubject<ContactForm>(this.contactForm.value);
    // subscribing to form value changes to update the form data
    this.contactForm.valueChanges.subscribe(value => this.formData$.next(value));
    // check for the number of preferred contacts to prevent the user from remove all preferred
    this.contacts$.pipe(
      map(currentContacts => 
        currentContacts.filter(contact => contact.deliveryFlag).length
      )
    ).subscribe(count => this.preferredContactsCounter$.next(count));
  }

  // initializing contacts behavior subject
  private contacts$ = new BehaviorSubject<ContactPerson[]>([]);
  private preferredContactsCounter$ = new BehaviorSubject<number>(0);
  contactPersonTypeOptions$ = new BehaviorSubject<SelectOption[]>(CONTACT_PERSON_TYPE);
  isNewContact$ = new BehaviorSubject<boolean>(false);

  getIsNewContact() {
    return this.isNewContact$.getValue();
  }
  // add neew contact button 
  isNewContact() {
    this.isNewContact$.next(!this.isNewContact$.value);
    this.resetForm();  
  }
  // add new contact from the form values (sumbit handler)
  addNewContact(): void {
    if (this.contactForm.valid) {
      const formValue: ContactForm = this.contactForm.value;
      const contactTypeOptions = this.contactPersonTypeOptions$.getValue();
      const contacts = this.getContactsArray();
      const nextId = contacts.length + 1; // taking the next id for the new contact
      const contactType: SelectOption = contactTypeOptions.find((option) => option.code === +formValue.type)!
      const newContact: ContactPerson = {
        id: nextId,
        deliveryFlag: formValue.preferred,
        type: {code: contactType.code, value:contactType.value},
        name: formValue.name,
        phoneNumber: this.phoneFormatPipe.transform(formValue.phone) as number,
        email: formValue.email,
        address: formValue.address
      }
      
      this.addContact(newContact);
      this.isNewContact$.next(false);
      this.resetForm();
      // Now store formValue which has the transformed phone number.
      // this.contactService.addContact(formValue)
    } else {
      alert('The form is invalid!');
    }
  }

  resetForm(){
    this.contactForm.reset()
  }

  getPreferredContactsCount(): Observable<number> {
    return this.preferredContactsCounter$.asObservable();
  }
  // get contacts observable
  getContacts(): Observable<ContactPerson[]> {
    return this.contacts$.asObservable();
  }

  // piped contacts observable for the phone number whather if its formated string for ui or number for data storage
  getPipedContacts(): Observable<ContactPerson[]> {
    return this.contacts$.asObservable().pipe(
      map(contacts => 
        contacts.map(contact => {
          const transformedContact = { ...contact };
          transformedContact.phoneNumber = this.phoneFormatPipe.transform(contact.phoneNumber) as string;
          return transformedContact;
        })
      )
    );
  }

  getContactsArray(): ContactPerson[] {
    return this.contacts$.getValue();
  }

  // add a new contact to the contacts list
  addContact(contact: ContactPerson): void {
    this.contacts$.next([...this.contacts$.getValue(), contact]);
  }

  // add insured to contacts
  addInsured(insured: Insured, typeData: SelectOption): void {
    
  const insuredAsContact: ContactPerson = {
    id: insured.identity,
    deliveryFlag: true,
    type: typeData!,
    name: `${insured.firstName} ${insured.lastName}`,
    phoneNumber: '',
    email: '',
    address: `${insured.address.streetName},${insured.address.cityName}`,
  }
  this.addContact(insuredAsContact);

  }

  // set (replace) the whole contacts list
  setContacts(contacts: ContactPerson[]): void {
    this.contacts$.next(contacts);
  }

  // delete and keep the prefferd contacts
  resetContacts(): void {
    const currentContacts = this.contacts$.getValue();
    const updatedContacts = currentContacts.filter(contact => contact.deliveryFlag);
    this.contacts$.next(updatedContacts);
  }
  // delete the entire contact list
  fullyResetContacts(): void {
    this.contacts$.next([]);
  }

  // need to add delay for prevent multi tapping
  // update the prefferd contacts
  updateDeliveryFlag(contactId: number): void {
    this.contacts$.pipe(
      take(1)
    ).subscribe(currentContacts => {
      const updatedContacts = currentContacts.map(contact => {
        if(contact.id === contactId) {
          if(contact.deliveryFlag) {
            const counter = this.preferredContactsCounter$.getValue();
            if(counter <= 1) {
              alert('one contact must be preferred');
              return contact; // return the contact as is
            }
          }
          return { ...contact, deliveryFlag: !contact.deliveryFlag };
        }
        return contact; // return the contact as is for non-matching ids
      });
  
      this.contacts$.next(updatedContacts); // update contacts with modified array
      
    });
  }};
