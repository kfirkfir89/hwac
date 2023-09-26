
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,Subject, take } from 'rxjs';
import { ContactPersons } from '../process-claim/process-claim.component';
import {  SelectOption } from '../constants/select-options.constants';

@Injectable({
  providedIn: 'root'
})
export class ContactStateService {
  
  private contacts$ = new BehaviorSubject<ContactPersons[]>([]);

  // Function to get the observable of contacts
  getContacts(): Observable<ContactPersons[]> {
    return this.contacts$.asObservable();
  }

  // Function to add a contact to the contacts list
  addContact(contact: ContactPersons): void {
    this.contacts$.next([...this.contacts$.getValue(), contact]);
  }

  addInsured(insured: ContactPersons): void {
    // Subscribe to contacts$ to get the latest emitted value
    this.contacts$.subscribe(contacts => {
    // Check if the contact is already in the contacts
    const isContactAlreadyIn = contacts.some(contact => contact.id === insured.id);   
    // If the contact is not already in the contacts, then add it
    if (!isContactAlreadyIn) {
        this.contacts$.next([...this.contacts$.getValue(), insured]);
      } else {
        return;
      }
    });
  }

  // Function to remove a contact from the contacts list
  removeContact(contactToRemove: ContactPersons): void {
    const currentContacts = this.contacts$.getValue();
    const updatedContacts = currentContacts.filter(contact => contact !== contactToRemove);
    this.contacts$.next(updatedContacts);
  }

  // Function to set (replace) the whole contacts list
  setContacts(contacts: ContactPersons[]): void {
    this.contacts$.next(contacts);
  }
  // Function to set (replace) the whole contacts list
  resetContacts(): void {
    const currentContacts = this.contacts$.getValue();
    const updatedContacts = currentContacts.filter(contact => contact.deliveryFlag);
    this.contacts$.next(updatedContacts);
  }
  // Function to set (replace) the whole contacts list
  fullyResetContacts(): void {
    this.contacts$.next([]);
  }

  updateDeliveryFlag(contactId: number): void {
    this.contacts$.pipe(
      take(1) // take 1 to automatically unsubscribe after receiving the first value
    ).subscribe(currentContacts => {
      const updatedContacts = currentContacts.map(contact =>
        contact.id === contactId ? { ...contact, deliveryFlag: !contact.deliveryFlag } : contact
      );
      this.contacts$.next(updatedContacts);
    });
  }
}
