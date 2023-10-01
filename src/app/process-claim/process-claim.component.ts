import { Component, OnInit } from '@angular/core';
import { ClaimForm, ClaimFormStateService } from '../services/claimFormState.service';
import { Subject, takeUntil } from 'rxjs';
import { ContactFormStateService } from '../services/contactFormState.service';

// defining types and interfaces for contact person, super claim, insured, and process
export type ContactPerson = {
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
  contactPersons: ContactPerson[];
}

// defining initial state of the process
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
        code: 2,
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
          <button (click)="resetClaimForm()" dir="rtl" class="btn">רענן תהליך</button>
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
          <button  [attr.disabled]="isDisabled ? true : null" [class.disabled-btn]="isDisabled" (click)="submitClaimForm()" dir="rtl" class="btn">המשך &larr;</button>
        </div>
      </div>
    </div>
  `,
})
export class ProcessClaimComponent implements OnInit {
  // declaring component state and variables
  process: IProcess;
  superClaim: SuperClaim;
  insured: Insured;
  contactPersons: ContactPerson[] = [];
  claimForm$: ClaimForm;
  private destroy$ = new Subject<void>();
  isDisabled = !this.claimFormStateService.claimForm.valid;

  // constructor to inject services and initialize state variables
  constructor(private claimFormStateService: ClaimFormStateService, private contactFormStateService: ContactFormStateService) {
    this.process = INITIAL_STATE;
    this.claimForm$ = claimFormStateService.claimForm.value
    const { superClaim ,insured ,contactPersons } = this.process    
    this.superClaim = superClaim;
    this.insured = insured;
    this.contactPersons = contactPersons;
  }

  // reset the claim form through service
  resetClaimForm(): void {
    this.claimFormStateService.resetFormData();
  }

  // submit the child form through service and get the final results
  submitClaimForm(): void {
    const contacts = this.contactFormStateService.getContactsArray()
    const contacts$ = this.contactFormStateService.getContacts()
    const formData = this.claimFormStateService.onSubmit(contacts$);
    if(formData){
      this.contactPersons = contacts;
      const process:IProcess = {
        superClaim: this.superClaim,
        insured: this.insured,
        contactPersons: this.contactPersons,
      }
      console.log('formData:', formData)
      console.log('processWithUpdatedContacts:', process)
    }
  }
  
  // ngOnInit lifecycle hook for initializing contacts array and subscriptions
  ngOnInit(): void {
    // initializing contacts array
    this.contactFormStateService.setContacts(this.contactPersons)
    // subscribing to form data changes and updating local variable accordingly
    this.claimFormStateService.getFormData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(formData => {
      this.claimForm$ = formData;
    });
    // subscribing to form validity changes and updating the disabled state of submit button
    this.claimFormStateService.isFormInvalid$()
    .pipe(takeUntil(this.destroy$))
    .subscribe(isInvalid => {
      this.isDisabled = isInvalid;
    });
  }

  // component lifecycle hook, cleanup function
  // completing the destroy observable to clean up subscriptions
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


