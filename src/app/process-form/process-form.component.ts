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
import { ClaimForm, ClaimFormStateService } from '../services/claimFormState.service';

@Component({
  selector: 'app-process-form',
  template: `
      <form [formGroup]="claimForm" class="grid grid-cols-2 bg-gray gap-x-5 gap-y-1">
      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
          <input formControlName="eventDate" dir="rtl" type="date" class="p-1"/>
        </div>
        <div class="flex-none">
          <span dir="rtl" class="whitespace-nowrap">תאריך אירוע:</span>
        </div>
      </div>

      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
            <app-select formControlName="claimType" [options$]="claimTypeOptions$"></app-select>
        </div>
        <div class="flex-none">
          <span dir="rtl" class="whitespace-nowrap">סוג תביעה על:</span>
        </div>
      </div>

      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
            <app-select formControlName="injuryType" [options$]="injuryTypeOptions$" [isDisabled]="claimCauseInvalid === null" ></app-select>
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
export class ProcessFormComponent{

  // initializing form select options with BehaviorSubjects
  claimCauseOptions$ = new BehaviorSubject<SelectOption[]>(CLAIM_CAUSE);
  contactPersonTypeOptions$ = new BehaviorSubject<SelectOption[]>(CONTACT_PERSON_TYPE);
  injuryTypeOptions$ = new BehaviorSubject<SelectOption[]>(INJURY_TYPE);
  submitionMethodOptions$ = new BehaviorSubject<SelectOption[]>(SUBMITION_METHOD);
  claimTypeOptions$ = new BehaviorSubject<SelectOption[]>(CLAIM_TYPE);
  
  // injecting claimFormStateService and initializing claimForm with the form group from the service
  constructor(private claimFormStateService: ClaimFormStateService) {
    this.claimFormStateService.formData$.subscribe((formData) => {
      this.claimCauseInvalid = formData.claimCause
    })
  }
  claimForm = this.claimFormStateService.claimForm;
  claimCauseInvalid: SelectOption | null = this.claimForm.get('claimCause')?.value;
}
