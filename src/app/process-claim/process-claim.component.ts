import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormDataSubscription, FormStateService } from '../services/formState.service';
import { Subject, takeUntil } from 'rxjs';
import { ContactStateService } from '../services/contactState.service';
export type ContactPersons = {
  id: number;
  deliveryFlag: boolean;
  type: {
      code: number;
      value: string;
  }
  name: string;
  phoneNumber: number;
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
      deliveryFlag: true,
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
      deliveryFlag: true,
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
  templateUrl: './process-claim.component.html',
  styleUrls: ['./process-claim.component.css']
})
export class ProcessClaimComponent implements OnInit {
  process: IProcess;
  superClaim: SuperClaim;
  insured: Insured;
  contactPersons: ContactPersons[] = [];
  childForm: FormGroup | null = null;
  receivedFormData: FormDataSubscription | null = null;
  private destroy$ = new Subject<void>();

  constructor(private formStateService: FormStateService, private contactService: ContactStateService) {
    this.process = INITIAL_STATE;
    const { superClaim ,insured ,contactPersons } = this.process    
    this.superClaim = superClaim;
    this.insured = insured;
    this.contactPersons = contactPersons;
  }

  resetChildForm(): void {
    this.formStateService.triggerResetForm();
  }
  submitChildForm(): void {
    this.formStateService.triggerSubmitForm();
  }
  ngOnInit(): void {
    this.contactService.setContacts(this.contactPersons)
    this.formStateService.getFormData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(formData => {
      this.receivedFormData = formData;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


