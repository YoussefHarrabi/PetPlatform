import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetComponent } from './add.component';

describe('AddComponent', () => {
  let component:  AddPetComponent;
  let fixture: ComponentFixture< AddPetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPetComponent]
    });
    fixture = TestBed.createComponent( AddPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
