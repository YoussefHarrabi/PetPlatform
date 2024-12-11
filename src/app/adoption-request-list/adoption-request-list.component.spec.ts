import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionRequestListComponent } from './adoption-request-list.component';

describe('AdoptionRequestListComponent', () => {
  let component: AdoptionRequestListComponent;
  let fixture: ComponentFixture<AdoptionRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdoptionRequestListComponent]
    });
    fixture = TestBed.createComponent(AdoptionRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
