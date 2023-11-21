import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiversComponent } from './receivers.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HeaderComponent } from '../layouts/header/header.component';
import { HamburgerComponent } from '../layouts/hamburger/hamburger.component';

describe('ReceiversComponent', () => {
  let component: ReceiversComponent;
  let fixture: ComponentFixture<ReceiversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReceiversComponent,
        HeaderComponent,
        HamburgerComponent
      ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    fixture = TestBed.createComponent(ReceiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
