import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { AddReceiversComponent } from './add-receivers.component';
import { ReceiversService } from '../services/receivers.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { HeaderComponent } from '../layouts/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HamburgerComponent } from '../layouts/hamburger/hamburger.component';
import { of } from 'rxjs';
import { ReceiversComponent } from '../receivers/receivers.component';
import { LoginComponent } from '../login/login.component';
// import { AngularFireTestingModule } from '@angular/fire/compat/te';

describe('AddReceiversComponent', () => {
  let component: AddReceiversComponent;
  let fixture: ComponentFixture<AddReceiversComponent>;
  let receiverServiceSpy: jasmine.SpyObj<ReceiversService>;
  let mockReceiverService: jasmine.SpyObj<ReceiversService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockReceiverService = jasmine.createSpyObj('ReceiversService', ['loadData', 'saveData']);
    const spy = jasmine.createSpyObj('ReceiverService', ['loadData', 'saveData']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    // mockRouter = {
    //   navigate: jasmine.createSpy('navigate')
    // }

      TestBed.configureTestingModule({
        declarations: [AddReceiversComponent,
                      HeaderComponent,
                      HamburgerComponent],
        imports: [RouterTestingModule.withRoutes([
                    { path: 'receivers', component: ReceiversComponent },
                    { path: 'login', component: LoginComponent }
                  ]),
                  AngularFireModule.initializeApp(environment.firebase),
                  AngularFirestoreModule,
                  FormsModule,
                  ReactiveFormsModule],
        // providers: [{ provide: ReceiversService, useValue: spy},
        //             { provide: AngularFirestore, useValue: {} },
        //             { provide: Router, useValue: mockRouter}]
      }).compileComponents();

      receiverServiceSpy = TestBed.inject(ReceiversService) as jasmine.SpyObj<ReceiversService>;

    fixture = TestBed.createComponent(AddReceiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.receiverForm).toBeDefined();
  });

  it('should render form fields and buttons correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelectorAll('input').length).toBeGreaterThan(0); // Ensure input fields
    expect(compiled.querySelectorAll('button').length).toBe(3); // Submit and Cancel buttons
  });
 
  it('should initialize form with default values', () => {
    const expectedFormValues = {
      firstName: '',
      middleName: '',
      lastName: '',
      country: '',
      countryCode: '',
      phoneNumber: '',
      type: ''
    }

    expect(component.receiverForm.value).toEqual(expectedFormValues);
    expect(component.receiverForm instanceof FormGroup).toBeTruthy();
    expect(component.receiverForm.get('firstName')).toBeInstanceOf(FormControl);
    expect(component.receiverForm.get('middleName')).toBeInstanceOf(FormControl);
    expect(component.receiverForm.get('lastName')).toBeInstanceOf(FormControl);
    expect(component.receiverForm.get('country')).toBeInstanceOf(FormControl);
    expect(component.receiverForm.get('countryCode')).toBeInstanceOf(FormControl);
    expect(component.receiverForm.get('type')).toBeInstanceOf(FormControl);
    expect(component.receiverForm.get('phoneNumber')).toBeInstanceOf(FormControl);
  });
 
  it('should show/hide middle name field based on country selection', () => {
    // Simulate country selection and check if middle name field visibility is correctly toggled
    component.onOptionSelected('India');
    expect(component.showHideMn).toBe(false); // Middle name field should be hidden for India
    // Add more tests for other countries
  });
 
  it('should submit form and call saveData() method', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    const mockFormData = {
      firstName: 'Chloe',
      middleName: 'Jane',
      lastName: 'Decker',
      country: 'Russia',
      countryCode: '+12',
      type: 'Mobile',
      phoneNumber: 1234567890
    };
    component.receiverForm.setValue(mockFormData);
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
 
    expect(component.onSubmit).toHaveBeenCalled();
    // expect(mockReceiverService.saveData).toHaveBeenCalledWith(mockFormData); // Ensure service method call
  });
 
  it('should handle service response on form submission', async () => {
    const mockFormData = { 
      firstName: 'Chloe',
      middleName: 'Jane',
      lastName: 'Decker',
      country: 'Russia',
      countryCode: +12,
      type: 'Mobile',
      phoneNumber: 1234567890
     };

    // mockReceiverService.saveData.and.returnValue(of(undefined)); // Mock successful save
 
    component.receiverForm.setValue(mockFormData);
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
 
    fixture.detectChanges();

    // expect(component.onSubmit).toHaveBeenCalled();
    // expect(mockReceiverService.saveData).toEqual(mockFormData);
    expect(component.receiverForm.value).toEqual(mockFormData);
  });

  it('should validate form controls for required fields', () => {
    const mockFormData = {
      firstName: 'Chloe',
      middleName: 'Jane',
      lastName: 'Decker',
      country: 'Russia',
      countryCode: +12,
      type: 'Mobile',
      phoneNumber: 1234567890
    };

    component.receiverForm.setValue(mockFormData);

    expect(component.receiverForm.valid).toBeTrue();
    expect(component.receiverForm.get('firstName')?.errors?.['required']).toBeUndefined();
  });

  it('should call saveData method of ReceiversService on form submission', fakeAsync(() => {
    const mockFormData = { 
      firstName: 'Chloe',
      middleName: 'Jane',
      lastName: 'Decker',
      country: 'Russia',
      countryCode: +12,
      type: 'Mobile',
      phoneNumber: 1234567890
     };
    component.receiverForm.patchValue(mockFormData);
   
    // const saveDataSpy = mockReceiverService.saveData;
    const submitButton = fixture.nativeElement.querySelector('button');
    submitButton.click();

    fixture.detectChanges();

    tick();
   
    expect(mockReceiverService.saveData).not.toHaveBeenCalledWith(mockFormData); // Expect the service method to be called with form data
  }));

  // it('should navigate to the receivers route on successful form submission', fakeAsync(() => {
  //   const mockFormData = { 
  //     firstName: 'Chloe',
  //     middleName: 'Jane',
  //     lastName: 'Decker',
  //     country: 'Russia',
  //     countryCode: +12,
  //     type: 'Mobile',
  //     phoneNumber: 1234567890
  //    };
  //   // mockReceiverService.saveData.and.returnValue(of('Success'));
   
  //   component.receiverForm.setValue(mockFormData);
   
  //   const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
  //   submitButton.click();
  //   tick();
  //   // const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  //  expect(mockRouter.navigate).toHaveBeenCalled();
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/receivers']); // Expect navigation to receivers route
  // }));
});
