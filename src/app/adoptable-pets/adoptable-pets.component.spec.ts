import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptablePetsComponent } from './adoptable-pets.component';

describe('AdoptablePetsComponent', () => {
  let component: AdoptablePetsComponent;
  let fixture: ComponentFixture<AdoptablePetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdoptablePetsComponent]
    });
    fixture = TestBed.createComponent(AdoptablePetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
