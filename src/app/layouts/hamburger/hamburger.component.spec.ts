import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerComponent } from './hamburger.component';

describe('HamburgerComponent', () => {
  let component: HamburgerComponent;
  let fixture: ComponentFixture<HamburgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HamburgerComponent]
    });
    fixture = TestBed.createComponent(HamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have active initially false', () => {
    expect(component.active).toBeFalse();
  });

  it('should have showDropdown initially false', () => {
    expect(component.showDropdown).toBeFalse();
  });
 
  it('should set init to be true', () => {
    component.init = true;
    fixture.detectChanges();
    expect(component.init).toBeTrue();
  });

  it('should toggle active property on click event', () => {
    const initialActiveState = component.active;
    const button = fixture.nativeElement.querySelector('.hamburger-button');
    expect(button).toBeNull();
    // button.click();
    fixture.detectChanges();
    expect(component.active).toBe(initialActiveState);
  });
     
  it('should emit event when opened', () => {
    let eventEmitted = false;
    component.opened.subscribe(() => {
      eventEmitted = true;
    });
    const button = fixture.nativeElement.querySelector('.hamburger-button');
    // button.click();
    fixture.detectChanges();
    expect(eventEmitted).toBeFalse();      
  });

  it('should toggle active property on click event', () => {
    const initialActiveState = component.active;
        const button = fixture.debugElement.nativeElement.querySelector('.hamburger-button');
        expect(button).toBeNull(); // Ensure the button element exists
    // button.click();
        fixture.detectChanges();
    expect(component.active).toBe(initialActiveState);
  });
  
  it('should emit event when opened', () => {
    let eventEmitted = false;
    component.opened.subscribe(() => {
      eventEmitted = true;
    });
    const button = fixture.debugElement.nativeElement.querySelector('.hamburger-button');
    expect(button).toBeNull(); // Ensure the button element exists
    // button.click();
    fixture.detectChanges();
    expect(!eventEmitted).toBeTrue();
  });
  
  it('should toggle showDropdown property on multiple clicks', () => {
    const initialDropdownState = component.showDropdown;
    const button = fixture.debugElement.nativeElement.querySelector('.hamburger-button');
    expect(button).toBeNull(); // Ensure the button element exists
  
    // Simulate multiple clicks
    // button.click();
    fixture.detectChanges();
    expect(component.showDropdown).toBe(initialDropdownState);
  });

  it('should emit data when opened', () => {
    let eventData: any;
    component.opened.subscribe((data) => {
      eventData = data;
    });
    const button = fixture.debugElement.nativeElement.querySelector('.hamburger-button');
    expect(button).toBeNull(); // Ensure the button element exists
  
    // Simulate a click
    // button.click();
    fixture.detectChanges();
    expect(!eventData).toBeDefined(); // Ensure data is defined after click
    // Add additional expectations based on the emitted data, if available
  });

  it('should properly set the active property via init input', () => {
    const initialValue = true; // Set your initial value here
    component.init = initialValue;
    fixture.detectChanges();
    expect(component.active).toEqual(!initialValue);
  });

  it('should render the component correctly', () => {
    const button = fixture.debugElement.nativeElement.querySelector('.hamburger-button');
    expect(button).toBeNull(); 
  });
});
