import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProcessClaimComponent } from './process-claim/process-claim.component';
import { ProcessInformationComponent } from './process-information/process-information.component';
import { SelectComponent } from './select/select.component';
import { ProcessFormComponent } from './process-form/process-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProcessClaimComponent,
    ProcessInformationComponent,
    SelectComponent,
    ProcessFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
