import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiverComponent } from './add-receiver.component';

describe('AddReceiverComponent', () => {
  let component: AddReceiverComponent;
  let fixture: ComponentFixture<AddReceiverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReceiverComponent]
    });
    fixture = TestBed.createComponent(AddReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
