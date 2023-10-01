import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable,Subject } from 'rxjs';
import { SelectOption } from '../constants/select-options.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactPerson } from '../process-claim/process-claim.component';
// service to handle the claim from state
// defining the interface for the claim form
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
  // declaring form group and form data behavior subject and type
  claimForm: FormGroup;
  formData$: BehaviorSubject<ClaimForm>;

  // injecting form builder to create a form group
  constructor(private fb: FormBuilder) {
    // initializing the form group with validators
    this.claimForm = this.fb.group({
      eventDate: [null , Validators.required],
      claimType: [null, Validators.required],
      injuryType:[null, Validators.required],
      claimCause:[null, Validators.required],
      submitionMethod: null,
      submitedBy: [null, Validators.required]
    });

    // initializing the form data with the form group value and validators
    this.formData$ = new BehaviorSubject<ClaimForm>(this.claimForm.value);
    // subscribing to form value changes to update the form data
    this.claimForm.valueChanges.subscribe(value => this.formData$.next(value));
    // subscribing to status changes to emit form validity
    this.claimForm.statusChanges.subscribe(status => {
      // emit whether the form is invalid
      this.isFormInvalidSubject.next(status === 'INVALID');
    });
  }

  // declaring a behavior subject to hold the form validity state
  private isFormInvalidSubject = new BehaviorSubject<boolean>(true);

  // get the observable of form validity state
  isFormInvalid$(): Observable<boolean> {
    return this.isFormInvalidSubject.asObservable();
  }

  // sumbit handler
  onSubmit(contacts$: Observable<ContactPerson[]>) {
    // we check if the form properly field with values
    // if its valid we pass it as FormDataSubscription type since the claimForm is is form control type
    if (!this.claimForm.invalid) {
      const formData = this.formData$.getValue();
      // checking for matching contact person
      let isContactInvalid = true;
      const submitedByOption = this.formData$.getValue().submitedBy;

      contacts$.subscribe((contacts) => {
        contacts.map((contact) => {
          if(contact.type.code === submitedByOption!.code){
            isContactInvalid = false;
          }
        })
      })
      if(isContactInvalid){
        return alert('חייב להיות איש קשר מאותו הסוג')
      }else{
        return formData;
      }
    }

    alert('The form is invalid!');
    return;
  }

  // get the observable of the form data
  getFormData(): Observable<ClaimForm> {
    return this.formData$.asObservable();
  }

  // reset the form data
  resetFormData() {
    this.formData$.next({
      eventDate: null,
      claimType: null,
      injuryType: null,
      claimCause: null,
      submitionMethod: null,
      submitedBy: null,
    });
    this.claimForm.reset();
    this.claimForm.setValue(this.formData$.getValue())
  }
}
