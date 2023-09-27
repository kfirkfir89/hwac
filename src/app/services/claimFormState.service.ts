import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,Subject } from 'rxjs';
import { SelectOption } from '../constants/select-options.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// a form state service to manage and manipulate the entire claim form
export interface ClaimForm {
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
export class ClaimFormStateService {
  // typing the form and validate it 
  // initalstate
  claimForm: FormGroup;
  formData$: BehaviorSubject<ClaimForm>;

  constructor(private fb: FormBuilder) {
    this.claimForm = this.fb.group({
      eventDate: [null , Validators.required],
      claimType: [null, Validators.required],
      injuryType:[null, Validators.required],
      claimCause:[null, Validators.required],
      submitionMethod: null,
      submitedBy: [null, Validators.required]
    });

    this.formData$ = new BehaviorSubject<ClaimForm>(this.claimForm.value);
    this.claimForm.valueChanges.subscribe(value => this.formData$.next(value));
        // Subscribe to statusChanges to get form validity updates
        this.claimForm.statusChanges.subscribe(status => {
          // Emit whether the form is invalid
          this.isFormInvalidSubject.next(status === 'INVALID');
        });
  }


  private submitFormSubject = new Subject<void>();
  private resetFormSubject = new Subject<void>();
  private isFormInvalidSubject = new BehaviorSubject<boolean>(true);

  resetForm$ = this.resetFormSubject.asObservable();
  submitForm$ = this.submitFormSubject.asObservable();

  isFormInvalid$(): Observable<boolean> {
    return this.isFormInvalidSubject.asObservable();
  }

  onSubmit(): void {
    // we check if the form properly field with values
    // if its valid we pass it as FormDataSubscription type since the claimForm is is form control type
    if (!this.claimForm.invalid) {
      console.log('formData$:', this.formData$.value)
      // checking for matching contact person
      // convert the type to select options..
    } else {
      alert('The form is invalid!');
    }
  }

  triggerResetForm() {
    this.resetFormSubject.next();
  }
  
  triggerSubmitForm() {
    this.submitFormSubject.next();
  }

  setFormData(newFormData: ClaimForm) {
    return this.formData$.next(newFormData);
  }

  getFormData(): Observable<ClaimForm> {
    return this.formData$.asObservable();
  }

  resetFormData() {
    this.claimForm.reset()
  }

}
