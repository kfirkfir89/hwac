import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  CONTACT_PERSON_TYPE,
  CLAIM_CAUSE, 
  INJURY_TYPE, 
  SUBMITION_METHOD, 
  SelectOption, 
  CLAIM_TYPE,
  IDENTITY_TYPES} from '../constants/select-options.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormDataSubscription, FormStateService } from '../services/formState.service';

export type ClaimForm = {
  eventDate: [Date | null, Validators],
  claimType: [SelectOption | null, Validators],
  injuryType: [SelectOption | null, Validators],
  claimCause: [SelectOption | null, Validators],
  submitionMethod: SelectOption | null,
  submitedBy: [SelectOption | null, Validators]
}

@Component({
  selector: 'app-process-form',
  template: `
      <form [formGroup]="claimForm" (ngSubmit)="onSubmit()" class="grid grid-cols-2 bg-gray gap-x-5 gap-y-1">
      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
          <input formControlName="eventDate" [class.invalid]="claimForm.get('eventDate')?.invalid && (claimForm.get('eventDate')?.dirty || claimForm.get('eventDate')?.touched)" dir="rtl" type="date" class="p-1"/>
        </div>
        <div class="flex-none">
          <span dir="rtl" class="whitespace-nowrap">תאריך אירוע:</span>
        </div>
      </div>

      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
            <app-select formControlName="claimType"  [class.invalid]="claimForm.get('claimType')" [options$]="claimTypeOptions$"></app-select>
        </div>
        <div class="flex-none">
          <span dir="rtl" class="whitespace-nowrap">סוג תביעה על:</span>
        </div>
      </div>

      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
            <app-select formControlName="injuryType" [options$]="injuryTypeOptions$" [isDisabled]="claimForm.get('claimCause')?.value === null" ></app-select>
        </div>
        <div class="flex-none">
          <span dir="rtl"  class="whitespace-nowrap">מהות האירוע:</span>
        </div>
      </div>

      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
            <app-select formControlName="claimCause" [options$]="claimCauseOptions$"></app-select>
        </div>
        <div class="flex-none">
          <span dir="rtl" class="whitespace-nowrap">סיבת אירוע:</span>
        </div>
      </div>

      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
            <app-select formControlName="submitionMethod" [options$]="submitionMethodOptions$"></app-select>
        </div>
        <div class="flex-none">
          <span dir="rtl" class="whitespace-nowrap">אופן קבלת התביעה:</span>
        </div>
      </div>

      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
            <app-select formControlName="submitedBy" [options$]="contactPersonTypeOptions$"></app-select>
        </div>
        <div class="flex-none">
          <span dir="rtl" class="whitespace-nowrap">תביעה הוגשה באמצעות:</span>
        </div>
      </div>
    </form>
  `,
})
export class ProcessFormComponent implements OnInit{

  claimCauseOptions$ = new BehaviorSubject<SelectOption[]>(CLAIM_CAUSE);
  contactPersonTypeOptions$ = new BehaviorSubject<SelectOption[]>(CONTACT_PERSON_TYPE);
  injuryTypeOptions$ = new BehaviorSubject<SelectOption[]>(INJURY_TYPE);
  submitionMethodOptions$ = new BehaviorSubject<SelectOption[]>(SUBMITION_METHOD);
  claimTypeOptions$ = new BehaviorSubject<SelectOption[]>(CLAIM_TYPE);

  claimForm = this.fb.group<ClaimForm>({
    eventDate: [null , Validators.required],
    claimType: [null, Validators.required],
    injuryType:[null, Validators.required],
    claimCause:[null, Validators.required],
    submitionMethod:null,
    submitedBy: [null, Validators.required]
  });
  constructor(
    private fb: FormBuilder, 
    private formStateService: FormStateService) {}
    
    // the submit function control the most of the form validation checks
  onSubmit(): void {
    // we check if the form properly field with values
    // if its valid we pass it as FormDataSubscription type since the claimForm is is form control type
    if (!this.claimForm.invalid) {
      this.formStateService.setFormData(this.claimForm.value as FormDataSubscription);
    } else {
      alert('The form is invalid!');
    }
  }


  resetForm(): void {
    this.claimForm.reset();
    this.formStateService.resetFormData();
  }
  
  
  ngOnInit(): void {
    this.formStateService.resetForm$.subscribe(() => this.resetForm());
    this.formStateService.submitForm$.subscribe(() => this.onSubmit());
    this.formStateService.isFormInvalid$.subscribe(() => this.claimForm.invalid);
  }

}
