import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../constants/select-options.constants';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { ClaimFormStateService } from '../services/claimFormState.service';

// set up component metadata and template
// The provider object with NG_VALUE_ACCESSOR is setting up this component as a custom form control value accessor. 
// The 'useExisting' is using a forward reference to the class 'SelectComponent' as it's not been defined yet at this point. 
// 'multi: true' is used so that multiple providers can be associated with NG_VALUE_ACCESSOR.
@Component({
  selector: 'app-select',
  template: `
    <select dir="rtl" class="w-200 p-1" [value]="valueSubject" (change)="selectChange($event)" [attr.disabled]="isDisabled ? true : null">
      <option [value]="" selected hidden></option>
      <option [value]="option" *ngFor="let option of options$ | async">
        {{ option.value }}
      </option>
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  // initialize input properties
  @Input() options$!: Observable<SelectOption[] | null>;
  @Input() value$!: Observable<SelectOption | null>;
  @Input() isDisabled!: boolean;

  valueSubject = new BehaviorSubject<SelectOption | null>(null);
  // valueOb$ = this.value$.asObservable();

  ngOnInit(){
    this.value$.subscribe((value) => {
      this.valueSubject.next(value);
    })
  }
  // set up method to handle value changes and interactions with parent form
  private onChange: (value: SelectOption | null) => void = () => {};

  // implement method to handle select change
  selectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex - 1;
    this.options$.subscribe(options => {
      this.valueSubject.next(options![selectedIndex]);
      this.onChange(this.valueSubject?.getValue());
    });
  }

  // implement control value accessor methods to interact with parent forms
  writeValue(value: SelectOption | null): void {
    this.valueSubject.next(value);
  }
 // set up registerOnChange to store the function to be called when the select component value changes.
  registerOnChange(fn: (value: SelectOption | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
  }

}
