import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPersonsCenterComponent } from './contact-persons-center.component';

describe('ContactPersonsCenterComponent', () => {
  let component: ContactPersonsCenterComponent;
  let fixture: ComponentFixture<ContactPersonsCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPersonsCenterComponent]
    });
    fixture = TestBed.createComponent(ContactPersonsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
