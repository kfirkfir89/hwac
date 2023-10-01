import { NgModule,  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProcessClaimComponent } from './process-claim/process-claim.component';
import { ProcessInformationComponent } from './process-information/process-information.component';
import { SelectComponent } from './select/select.component';
import { ProcessFormComponent } from './process-form/process-form.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactPersonsComponent } from './contact-persons/contact-persons.component';
import { ContactPersonsCenterComponent } from './contact-persons-center/contact-persons-center.component';
import { PhoneFormatPipe } from './services/phone-format.pipe';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessClaimComponent,
    ProcessInformationComponent,
    SelectComponent,
    ProcessFormComponent,
    ContactPersonsComponent,
    ContactPersonsCenterComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [PhoneFormatPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
