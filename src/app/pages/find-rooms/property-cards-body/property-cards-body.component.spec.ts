import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCardsBodyComponent } from './property-cards-body.component';

describe('PropertyCardsBodyComponent', () => {
  let component: PropertyCardsBodyComponent;
  let fixture: ComponentFixture<PropertyCardsBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyCardsBodyComponent]
    });
    fixture = TestBed.createComponent(PropertyCardsBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
