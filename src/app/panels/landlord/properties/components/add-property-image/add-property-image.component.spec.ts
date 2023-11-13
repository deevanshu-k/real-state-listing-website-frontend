import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyImageComponent } from './add-property-image.component';

describe('AddPropertyImageComponent', () => {
  let component: AddPropertyImageComponent;
  let fixture: ComponentFixture<AddPropertyImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPropertyImageComponent]
    });
    fixture = TestBed.createComponent(AddPropertyImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
