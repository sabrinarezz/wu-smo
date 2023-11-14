import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiversComponent } from './add-receivers.component';
import { ReceiversService } from '../services/receivers.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { HeaderComponent } from '../layouts/header/header.component';

describe('AddReceiversComponent', () => {
  let component: AddReceiversComponent;
  let fixture: ComponentFixture<AddReceiversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReceiversComponent,
                    HeaderComponent],
      imports: [FormsModule,
                ReactiveFormsModule,
                AngularFireModule.initializeApp(environment.firebase)],
      providers: [ReceiversService,
                  Router]
    }).compileComponents();

    fixture = TestBed.createComponent(AddReceiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
