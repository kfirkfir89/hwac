import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessClaimComponent } from './process-claim.component';
import { ClaimFormStateService } from '../services/claimFormState.service';
import { ContactFormStateService } from '../services/contactFormState.service';
import { of } from 'rxjs';
import { PhoneFormatPipe } from '../services/phone-format.pipe';

fdescribe('ProcessClaimComponent', () => {
  let component: ProcessClaimComponent;
  let fixture: ComponentFixture<ProcessClaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessClaimComponent, PhoneFormatPipe], // components and pipes
      providers: [ContactFormStateService] // services
    });
    fixture = TestBed.createComponent(ProcessClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  beforeEach(async () => {
    const claimSpy = jasmine.createSpyObj('ClaimFormStateService', ['resetFormData', 'getFormData', 'isFormInvalid$', 'onSubmit']);
    const contactSpy = jasmine.createSpyObj('ContactFormStateService', ['setContacts', 'getContactsArray']);

    // Here mock the claimForm object with a valid property
    claimSpy.claimForm = {
      value: {},
      valid: true, // or false depending on what you want to test
    };

    await TestBed.configureTestingModule({
      declarations: [ProcessClaimComponent],
      providers: [
        { provide: ClaimFormStateService, useValue: claimSpy },
        { provide: ContactFormStateService, useValue: contactSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessClaimComponent);
    component = fixture.componentInstance;

    let mockClaimFormStateService = TestBed.inject(ClaimFormStateService) as jasmine.SpyObj<ClaimFormStateService>;
    let mockContactFormStateService = TestBed.inject(ContactFormStateService) as jasmine.SpyObj<ContactFormStateService>;

    mockClaimFormStateService.getFormData.and.returnValue(of({
      eventDate: null,
      claimType: null,
      injuryType: null,
      claimCause: null,
      submitionMethod: null,
      submitedBy: null
    }));
    mockClaimFormStateService.isFormInvalid$.and.returnValue(of(true));
});
});
