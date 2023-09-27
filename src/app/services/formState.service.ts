import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,Subject } from 'rxjs';
import { SelectOption } from '../constants/select-options.constants';

export type FormDataSubscription = {
  eventDate: Date | null;
  claimType: SelectOption | null;
  injuryType: SelectOption | null;
  claimCause: SelectOption | null;
  submitionMethod: SelectOption | null;
  submitedBy: SelectOption | null;
}
@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private readonly initialState = {
    eventDate: null,
    claimType: null,
    injuryType: null,
    claimCause: null,
    submitionMethod: null,
    submitedBy: null
  };
  

  formData$ = new BehaviorSubject<FormDataSubscription>(
    this.initialState
    );
    
  private submitFormSubject = new Subject<void>();
  private resetFormSubject = new Subject<void>();
  private isFormInvalidSubject = new Subject<void>();

  resetForm$ = this.resetFormSubject.asObservable();
  submitForm$ = this.submitFormSubject.asObservable();
  isFormInvalid$ = this.isFormInvalidSubject.asObservable();

  triggerResetForm() {
    this.resetFormSubject.next();
  }
  
  triggerSubmitForm() {
    this.submitFormSubject.next();
  }

  setFormData(newFormData: FormDataSubscription) {
    return this.formData$.next(newFormData);
  }

  getFormData(): Observable<FormDataSubscription> {
    return this.formData$.asObservable();
  }

  resetFormData() {
    this.formData$.next(this.initialState);
  }

}
