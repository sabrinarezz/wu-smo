import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the section element', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
  });

  it('should have atleast two divs', () => {
    const divs = fixture.debugElement.queryAll(By.css('div'));
    expect(divs.length).toBeGreaterThanOrEqual(2);
  });

  it('should have a div with class links', () => {
    const linksDiv = fixture.debugElement.query(By.css('.p-3.links'));
    expect(linksDiv).toBeTruthy();
  });

  it('should have a legalInfoDiv', () => {
    const legalInfoDiv = fixture.debugElement.query(By.css('[style="font-size: 12px; padding: 15px;"]'));
    expect(legalInfoDiv).toBeTruthy();
  });

  it('should have a paragraph', () => {
    const legalInfoDiv = fixture.debugElement.query(By.css('[style="font-size: 12px; padding: 15px;"]'));
    const paragraph = legalInfoDiv.query(By.css('p'));
    expect(paragraph.nativeElement.textContent).toContain('Services may be provided by Western Union');
  })
});
