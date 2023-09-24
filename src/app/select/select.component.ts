import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../constants/select-options.constants';

@Component({
  selector: 'app-select',
  template: `
    <select dir="rtl" class="w-200 p-1" [value]="value" (change)="onSelected($event)">
      <option value="" disabled selected hidden></option>
      <option [value]="option.code" *ngFor="let option of options">
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
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  value!: string | null;
  onChange = (value: any) => {};
  onTouched = () => {};

  ngOnInit(): void {
    console.log('OnInit: Options: ', this.options);
  }

  onSelected(event: Event): void {
    const target = event.target as HTMLSelectElement; // Type assertion here
    // Now you can use `target` as an instance of HTMLSelectElement.
    const value = target.value;
    console.log(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}