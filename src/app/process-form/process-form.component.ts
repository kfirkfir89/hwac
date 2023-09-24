import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { 
  CONTACT_PERSON_TYPE, 
  CLAIM_CAUSE, 
  IDENTITY_TYPES, 
  INJURY_TYPE, 
  SUBMITION_METHOD, 
  SUPER_CLAIM_TYPE, 
  SelectOption, 
  CLAIM_TYPE} from '../constants/select-options.constants';
import { BehaviorSubject } from 'rxjs';

export type ClaimForm = {
  eventDate: Date | null,
  claimType: SelectOption | null,
  injuryType: SelectOption | null,
  claimCause: SelectOption | null,
  submitionMethod: SelectOption | null,
  identityTypes: SelectOption | null
}
@Component({
  selector: 'app-process-form',
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.css']
})
export class ProcessFormComponent implements OnInit{
  claimForm = this.fb.group({
    eventDate: new Date(),
    claimType: '',
    injuryType: '',
    claimCause: '',
    submitionMethod: '',
    identityTypes: ''
  });
  
  constructor(private fb: FormBuilder) {}
  
  contactPersonTypeOptions: SelectOption[] = CONTACT_PERSON_TYPE;
  superClaimTypeOptions: SelectOption[] = SUPER_CLAIM_TYPE;
  claimCauseOptions: SelectOption[] = CLAIM_CAUSE;
  identityTypesOptions: SelectOption[] = IDENTITY_TYPES;
  injuryTypeOptions: SelectOption[] = INJURY_TYPE;
  submitionMethodOptions: SelectOption[] = SUBMITION_METHOD;
  claimTypeOptions: SelectOption[] = CLAIM_TYPE;
  
  ngOnInit(): void {
    this.claimForm.valueChanges.subscribe(console.log);
  }

}
