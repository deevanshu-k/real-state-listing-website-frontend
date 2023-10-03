import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInTouchButtonFooterComponent } from './get-in-touch-button-footer.component';

describe('GetInTouchButtonFooterComponent', () => {
  let component: GetInTouchButtonFooterComponent;
  let fixture: ComponentFixture<GetInTouchButtonFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetInTouchButtonFooterComponent]
    });
    fixture = TestBed.createComponent(GetInTouchButtonFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
