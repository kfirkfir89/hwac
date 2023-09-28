import { Component, Input } from '@angular/core';
import { Insured } from '../process-claim/process-claim.component';

@Component({
  selector: 'app-process-information',
  template: `
    <div class="flex justify-center bg-ligthblue">
      <div class="flex justify-end px-8 p-2">
        <span dir="rtl" class="whitespace-nowrap text-2xl font-bold text-blue">ריכוז מידע בתהליך</span>
      </div>
    </div>
    <div *ngIf="insured" class="flex justify-center px-8 py-8">
      <span dir="rtl" class="whitespace-nowrap flex flex-col px-4">
        <span class="whitespace-nowrap py-1">{{ insured.address.streetName }}, {{ insured.address.cityName }}</span>
        כתובת
      </span>
      <span dir="rtl" class="whitespace-nowrap flex flex-col px-4">
        <span class="whitespace-nowrap py-1">{{ insured.age }}</span>
        גיל
      </span>
      <span dir="rtl" class="whitespace-nowrap flex flex-col px-4">
        <span class="whitespace-nowrap py-1">{{ insured.identity }}</span>
        ת.ז
      </span>
      <span dir="rtl" class="whitespace-nowrap flex flex-col px-4">
        <span class="whitespace-nowrap py-1">{{ insured.firstName }} {{ insured.lastName }}</span>
        שם
      </span>
      <span dir="rtl" class="whitespace-nowrap px-4 py-1">פרטי מבוטח:</span>
    </div>
    <div class="flex justify-center px-8 py-6 bg-gray">
      <app-process-form></app-process-form>
    </div>
  `,
})
export class ProcessInformationComponent {
  @Input() insured!: Insured;  
}
