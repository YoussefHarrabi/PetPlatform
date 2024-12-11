import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdoptionRequestsComponent } from './user-adoption-requests.component';

describe('UserAdoptionRequestsComponent', () => {
  let component: UserAdoptionRequestsComponent;
  let fixture: ComponentFixture<UserAdoptionRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAdoptionRequestsComponent]
    });
    fixture = TestBed.createComponent(UserAdoptionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
