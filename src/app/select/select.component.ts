import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../constants/select-options.constants';
import { BehaviorSubject, Observable, take } from 'rxjs';

// set up component metadata and template
// The provider object with NG_VALUE_ACCESSOR is setting up this component as a custom form control value accessor. 
// The 'useExisting' is using a forward reference to the class 'SelectComponent' as it's not been defined yet at this point. 
// 'multi: true' is used so that multiple providers can be associated with NG_VALUE_ACCESSOR.
@Component({
  selector: 'app-select',
  template: `
    <select #selectElement [value]="valueSubject$" dir="rtl" class="w-200 p-1" (change)="selectChange($event)" [attr.disabled]="isDisabled ? true : null">
        <option [value]="" selected hidden></option>
        <option *ngFor="let option of options$ | async" [ngValue]="option">{{ option.value }}</option>
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
  @Input() isDisabled!: boolean;
  @ViewChild('selectElement') select!: ElementRef<HTMLSelectElement>;
 
  valueSubject = new BehaviorSubject<SelectOption | null>(null);
  valueSubject$ = this.valueSubject.asObservable();

  // set up method to handle value changes and interactions with parent form
  private onChange: (value: SelectOption | null) => void = () => {};

  // implement method to handle select change
  selectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex - 1;
    this.options$.pipe(take(1)).subscribe(options => {
      if (options) {
        this.valueSubject.next(options[selectedIndex]);
        this.onChange(options[selectedIndex]);
      }
    });
    // change the select value when reset form
    this.valueSubject.subscribe((value) => {
      if(value === null){
        this.select.nativeElement.value = '';
      }
    })
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
