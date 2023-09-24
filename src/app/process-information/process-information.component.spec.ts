import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInformationComponent } from './process-information.component';

describe('ProcessInformationComponent', () => {
  let component: ProcessInformationComponent;
  let fixture: ComponentFixture<ProcessInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessInformationComponent]
    });
    fixture = TestBed.createComponent(ProcessInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
