import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocumentsComponent } from './update-documents.component';

describe('UpdateDocumentsComponent', () => {
  let component: UpdateDocumentsComponent;
  let fixture: ComponentFixture<UpdateDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDocumentsComponent]
    });
    fixture = TestBed.createComponent(UpdateDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
