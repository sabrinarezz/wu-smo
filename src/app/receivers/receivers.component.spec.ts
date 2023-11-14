import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiversComponent } from './receivers.component';

describe('ReceiversComponent', () => {
  let component: ReceiversComponent;
  let fixture: ComponentFixture<ReceiversComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiversComponent]
    });
    fixture = TestBed.createComponent(ReceiversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
