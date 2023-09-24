import { Component, Input } from '@angular/core';
import { Insured } from '../process-claim/process-claim.component';
import { SelectOption } from '../constants/select-options.constants';

@Component({
  selector: 'app-process-information',
  templateUrl: './process-information.component.html',
  styleUrls: ['./process-information.component.css']
})
export class ProcessInformationComponent {
  @Input() insured!: Insured;  
}
