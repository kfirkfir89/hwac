import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../constants/select-options.constants';
import { BehaviorSubject, map, Observable, take } from 'rxjs';

@Component({
  selector: 'app-select',
  template: `
    <select dir="rtl" class="w-200 p-1" [value]="value$ | async" (change)="selectChange($event)" [attr.disabled]="isDisabled ? true : null">
      <option value="" selected hidden></option>
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
  @Input() options$!: Observable<SelectOption[] | null>;
  @Input() isDisabled!: boolean;
  private valueSubject = new BehaviorSubject<SelectOption | null>(null);
  value$ = this.valueSubject.asObservable();
  private onChange: (value: SelectOption | null) => void = () => {};

  selectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const index = target.selectedIndex - 1; // Subtracting 1 to account for the hidden default option
    this.options$.pipe(
      take(1),
      map(options => options && options[index])
    ).subscribe(selectedOption => {
      this.valueSubject.next(selectedOption || null);
      this.onChange(selectedOption || null); // Notifying parent form about the value change
    });
  }

  writeValue(value: SelectOption | null): void {
    this.valueSubject.next(value);
  }

  registerOnChange(fn: (value: SelectOption | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
  }

}
