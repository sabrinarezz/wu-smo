import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HamburgerComponent } from '../layouts/hamburger/hamburger.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HeaderComponent,
        HamburgerComponent
      ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app-header component', () => {
    const appHeader = fixture.debugElement.query(By.css('app-header'));
    expect(appHeader).toBeNull();
  });

  it('should render the image tag with correct attributes', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
 
    const imgElement: HTMLImageElement = img.nativeElement;
    expect(imgElement.src).toContain('http://localhost:9876/assets/wu-logo.png');
    expect(imgElement.alt).toBe('');
  });
});
