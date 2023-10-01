import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SelectComponent } from './select.component'; // Adjust the import path if needed
import { SelectOption } from '../constants/select-options.constants'; // Adjust the import path if needed

@Component({
  template: `<app-select [options$]="options$" (change)="selectChange($event)"></app-select>`
})
class TestHostComponent {
  options$ = of([{code: 1, value: 'Option 1'}, {code: 2, value: 'Option 2'}] as SelectOption[]);

  selectChange(event: any) {}
}

describe('SelectComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent, TestHostComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct number of options', () => {
    const selectElement: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectElement.options.length).toBe(3); // Including the hidden default option
  });

  it('should call selectChange on option change', () => {
    const spy = spyOn(component, 'selectChange');
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('select')).nativeElement;
    select.value = select.options[1].value; // select the second option
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
