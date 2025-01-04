import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnimalsComponent } from './user-animals.component';

describe('UserAnimalsComponent', () => {
  let component: UserAnimalsComponent;
  let fixture: ComponentFixture<UserAnimalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAnimalsComponent]
    });
    fixture = TestBed.createComponent(UserAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
