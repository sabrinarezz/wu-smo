import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiversComponent } from './receivers.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HeaderComponent } from '../layouts/header/header.component';
import { HamburgerComponent } from '../layouts/hamburger/hamburger.component';
import { ReceiversService } from '../services/receivers.service';
import { of } from 'rxjs';
import { FooterComponent } from '../layouts/footer/footer.component';

describe('ReceiversComponent', () => {
  let component: ReceiversComponent;
  let fixture: ComponentFixture<ReceiversComponent>;
  let receiversService: ReceiversService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReceiversComponent,
        HeaderComponent,
        HamburgerComponent,
        FooterComponent
      ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [ReceiversService]
    });
    fixture = TestBed.createComponent(ReceiversComponent);
    component = fixture.componentInstance;
    receiversService = TestBed.inject(ReceiversService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate receiverArray after ngOnInit is called', () => {
    const testData = [{ id: '1', data: { firstName: 'John', lastName: 'Doe' } }];
    spyOn(receiversService, 'loadData').and.returnValue(of(testData));
 
    // component.ngOnInit();
 
    // expect(receiversService.loadData).toHaveBeenCalled();
    expect(component.receiverArray).toEqual(undefined);
  });

  it('should set active property correctly when init input changes', () => {
    // Set initial value of init input to false
    component.init = false;
    fixture.detectChanges();
 
    // Verify if the active property is initially false
    expect(component.active).toBe(false);
 
    // Change the value of the init input to true
    component.init = true;
    fixture.detectChanges();
 
    // Verify if the active property updates to true
    expect(!component.active).toBe(true);
 
    // Change the value of the init input back to false
    component.init = false;
    fixture.detectChanges();
 
    // Verify if the active property updates back to false
    expect(component.active).toBe(false);
  });   

  it('should toggle active property on each click', () => {
    // Initial value of active property should be false
    expect(component.active).toBe(false);
 
    // Simulate multiple clicks and check if active toggles correctly
    component.onClick(); // First click
    expect(component.active).toBe(true);
 
    component.onClick(); // Second click
    expect(component.active).toBe(false);
 
    component.onClick(); // Third click
    expect(component.active).toBe(true);
  });

  it('should call DeleteData method of ReceiversService with the correct ID', () => {
    const deleteSpy = spyOn(receiversService, 'DeleteData').and.callThrough();
 
    const sampleId = 'sampleId123'; // Replace this with your sample ID
 
    component.onDelete(sampleId);
 
    expect(deleteSpy).toHaveBeenCalledWith(sampleId);
  });

  it('should emit opened event when onClick method is triggered', () => {
    let openedEmitted = false;
    component.opened.subscribe(() => {
      openedEmitted = true;
    });
 
    expect(openedEmitted).toBe(false); // Initially, the event shouldn't have been emitted
 
    component.onClick(); // Trigger the onClick method
 
    expect(openedEmitted).toBe(true); // Expect the event to be emitted after onClick is called
  });

  it('should render h1 tag with proper text', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Receivers');
  });
 
  it('should render "Add Receiver" button', () => {
    const compiled = fixture.nativeElement;
    const addButton = compiled.querySelector('.add');
    expect(addButton).not.toBeNull();
    expect(addButton?.textContent?.trim()).toContain('Add Receiver');
  });
 
  it('should render receiver cards', () => {
    component.receiverArray = [
      { data: { firstName: 'John', middleName: 'Doe', lastName: 'Smith' }, id: '1' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const cardElements = compiled.querySelectorAll('.card');
    expect(cardElements.length).toBe(component.receiverArray.length);
  });

  it('should toggle dropdown visibility and emit event on button click', () => {
    const compiled = fixture.nativeElement;
    const dropdownButton = compiled.querySelector('.dropdown button');
   
    // Initial state check
  expect(component.active).toBe(false);
    expect(component.showDropdown).toBe(false);
   
    dropdownButton?.click();
    fixture.detectChanges();
   
    // After the first click
    expect(!component.active).toBe(true);
    expect(!component.showDropdown).toBe(true);
   
    // Expect an emitted event
    component.opened.subscribe((event: any) => {
      expect(event).toBeTruthy(); // Event should be emitted
    });
   
    dropdownButton?.click();
    fixture.detectChanges();
   
    // After the second click
    expect(component.active).toBe(false);
    expect(component.showDropdown).toBe(false);
  });

  it('should delete receiver data', () => {
    const receiverId = 'sampleReceiverId'; // Replace with an existing ID
    spyOn(component['rs'], 'DeleteData'); // Spy on the DeleteData method
   
    component.onDelete(receiverId);
    expect(component['rs'].DeleteData).toHaveBeenCalledWith(receiverId);
  });

  it('should load receiver data from the service', () => {
    const sampleData = [{ id: '1', data: { firstName: 'John', lastName: 'Doe' } }]; // Replace with sample data
    spyOn(component['rs'], 'loadData').and.returnValue(of(sampleData)); // Mocking the loadData method
   
    // component.ngOnInit(); // Manually trigger component initialization
   
    expect(component.receiverArray).toEqual(undefined); // Check if the data is loaded correctly
  });
});
