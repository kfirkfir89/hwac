import { Component, OnInit  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  templateUrl: './process-form.component.html',
  styleUrls: ['./process-form.component.css']
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
  claimFormTest!: Observable<FormDataSubscription>;

  constructor(
    private fb: FormBuilder, 
    private formStateService: FormStateService) {}

  onSubmit(): void {
    if (!this.claimForm.invalid) {
      const formValues = this.claimForm.value;
      this.formStateService.setFormData(formValues as FormDataSubscription);
    } else {
      alert('The form is invalid!');
    }
  }

  resetForm(): void {
    this.claimForm.reset();
    this.formStateService.resetFormData();
  }
  
  
  ngOnInit(): void {
    this.claimFormTest = this.formStateService.getFormData();
    this.formStateService.resetForm$.subscribe(() => this.resetForm());
    this.formStateService.submitForm$.subscribe(() => this.onSubmit());
  }

}
