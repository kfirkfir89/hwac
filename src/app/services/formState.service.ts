import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,Subject } from 'rxjs';
import { SelectOption } from '../constants/select-options.constants';
import { ClaimForm } from '../process-form/process-form.component';
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

  private formData$ = new BehaviorSubject<FormDataSubscription>(
    this.initialState
    );
    
  private submitFormSubject = new Subject<void>();
  private resetFormSubject = new Subject<void>();

  resetForm$ = this.resetFormSubject.asObservable();
  submitForm$ = this.submitFormSubject.asObservable();

  triggerResetForm() {
    this.resetFormSubject.next();
  }

  triggerSubmitForm() {
    this.submitFormSubject.next();
  }
  public setFormData = (newFormData: FormDataSubscription) => this.formData$.next(newFormData);
  public getFormData = (): Observable<FormDataSubscription> => this.formData$.asObservable();
  public resetFormData = () => this.formData$.next(this.initialState);

  // sendFormData(newFormData: FormDataSubscription) {
  //   this.formData$.subscribe(() => newFormData);  
  //   console.log('formData:', this.formData$)
  // }
}
