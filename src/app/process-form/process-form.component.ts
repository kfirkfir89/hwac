import { Component } from '@angular/core';
import { 
  CONTACT_PERSON_TYPE,
  CLAIM_CAUSE, 
  INJURY_TYPE, 
  SUBMITION_METHOD, 
  SelectOption, 
  CLAIM_TYPE,
} from '../constants/select-options.constants';
import { BehaviorSubject, Subject } from 'rxjs';
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
            <app-select formControlName="claimType"  [options$]="claimTypeOptions$"></app-select>
        </div>
        <div class="flex-none">
          <span dir="rtl" class="whitespace-nowrap">סוג תביעה על:</span>
        </div>
      </div>

      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
            <app-select formControlName="injuryType"  [options$]="injuryTypeOptions$" [isDisabled]="(claimCauseValue$ | async) === null" ></app-select>
        </div>
        <div class="flex-none">
          <span dir="rtl"  class="whitespace-nowrap">מהות האירוע:</span>
        </div>
      </div>

      <div class="flex flex-nowrap p-1">
        <div class="flex-1">
            <app-select formControlName="claimCause"  [options$]="claimCauseOptions$"></app-select>
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
            <app-select formControlName="submitedBy"  [options$]="contactPersonTypeOptions$"></app-select>
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

  
  claimCauseValue$ = new BehaviorSubject<SelectOption | null>(null);

  // injecting claimFormStateService and initializing claimForm values to display the selected option from the form async
  constructor(private claimFormStateService: ClaimFormStateService) {
    // checking for claimCause value to allow injuryType access
    this.claimFormStateService.formData$.subscribe((formData) => {
      this.claimCauseValue$.next(formData.claimCause);
    })
  }
  claimForm = this.claimFormStateService.claimForm;
}
