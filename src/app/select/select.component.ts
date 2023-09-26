import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../constants/select-options.constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-select',
  template: `
    <select dir="rtl" class="w-200 p-1" [value]="value$ | async" (change)="selectChange($event)" [attr.disabled]="isDisabled ? true : null">
      <option value=""  selected hidden></option>
      <option [value]="option.code" *ngFor="let option of options$ | async">
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
  private valueSubject = new BehaviorSubject<string>(''); // Here is the BehaviorSubject
  value$ = this.valueSubject.asObservable();

  onChange: (value: string) => void = () => {};

  ngOnInit(): void {
    this.value$.subscribe(value => this.onChange(value));
  }

  selectChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.valueSubject.next(value); // Here we emit the new value to the BehaviorSubject
  }

  writeValue(value: string): void {
    this.valueSubject.next(value); // Writing value by emitting it to BehaviorSubject
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
  }

}