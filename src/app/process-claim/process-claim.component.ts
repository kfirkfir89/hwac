import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClaimForm, ClaimFormStateService } from '../services/claimFormState.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ContactFormStateService } from '../services/contactFormState.service';

export type ContactPersons = {
  id: number;
  deliveryFlag: boolean;
  type: {
      code: number;
      value: string;
  }
  name: string;
  phoneNumber: number | string;
  email: string;
  address: string;
}
export type SuperClaim = {
  superClaimNum: number;
  superClaimStatus: {
      code: number;
      value: string;
  };
}
export type Insured = {
    address: {
      cityName: string;
      streetName: string;
  };
  identityType: number;
  age: number;
  lastName: string;
  identity: number;
  firstName: string;
}
export interface IProcess {
  superClaim: SuperClaim,
  insured: Insured,
  contactPersons: ContactPersons[];
}

export const INITIAL_STATE: IProcess = {
  superClaim: {
    superClaimNum: 1,
    superClaimStatus: {
      code: 500038313,
      value: 'פתוחה',
    },
  },
  insured: {
    address: {
      cityName: 'רעננה',
      streetName: 'אחוזה',
    },
    identityType: 1,
    age: 35,
    lastName: 'ג\'\יין',
    identity: 27854122145,
    firstName: 'מריה',
  },
  contactPersons: [
    {
      id: 1,
      deliveryFlag: false,
      type: {
        code: 1,
        value: 'סוכן',
      },
      name: 'טוביה בצקי',
      phoneNumber: 525452203,
      email: '',
      address: 'מחנה תל נוף',
    },
    {
      id: 2,
      deliveryFlag: false,
      type: {
        code: 1,
        value: 'מבוטח',
      },
      name: 'ניקיטה ג\'\יין',
      phoneNumber: 525816206,
      email: 'nikita_jain@amat.com',
      address: 'רחובות אופנהיימר',
    }
  ],
};

@Component({
  selector: 'app-process-claim',
  template: `
    <div class="container flex flex-col p-4 w-100vw">
      Value: {{ claimForm$ | json }}
      <div class="flex align-center bg-gray p-4 top-border">
        <div class="flex-1 px-8">
          <button (click)="resetChildForm()" dir="rtl" class="btn">רענן תהליך</button>
        </div>
        <div class="flex-none pr-16">
          <span dir="rtl" class="whitespace-nowrap pr-1">פתוחה</span>
          <span dir="rtl" class="whitespace-nowrap">מצב תביעה:</span>
        </div>
        <div class="flex px-8">
          <span dir="rtl" class="whitespace-nowrap pr-1">45615165</span>
          <span dir="rtl" class="whitespace-nowrap">תביעות על:</span>
        </div>
      </div>
      <app-process-information [insured]="insured" class="py-1"/>
      <app-contact-persons-center [insured]="insured" />
      <app-contact-persons />
      <div class="flex align-center p-4">
        <div class="flex-1 px-8">
          <button [attr.disabled]="isDisabled ? true : null" [class.disabled-btn]="isDisabled" (click)="submitChildForm()" dir="rtl" class="btn">המשך &larr;</button>
        </div>
      </div>
    </div>
  `,
})
export class ProcessClaimComponent implements OnInit {
  process: IProcess;
  superClaim: SuperClaim;
  insured: Insured;
  contactPersons: ContactPersons[] = [];
  claimForm$: ClaimForm;
  private destroy$ = new Subject<void>();
  isDisabled = !this.claimFormStateService.claimForm.valid;
  constructor(private claimFormStateService: ClaimFormStateService, private contactService: ContactFormStateService) {
    this.process = INITIAL_STATE;
    this.claimForm$ = claimFormStateService.claimForm.value
    const { superClaim ,insured ,contactPersons } = this.process    
    this.superClaim = superClaim;
    this.insured = insured;
    this.contactPersons = contactPersons;
  }

  resetChildForm(): void {
    this.claimFormStateService.triggerResetForm();
  }
  submitChildForm(): void {
    this.claimFormStateService.onSubmit();
  }
  ngOnInit(): void {
    this.contactService.setContacts(this.contactPersons)
    this.claimFormStateService.getFormData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(formData => {
        this.claimForm$ = formData;
      });
      this.claimFormStateService.isFormInvalid$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isInvalid => {
        console.log('Received in parent:', isInvalid);
        this.isDisabled = isInvalid;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


