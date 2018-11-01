import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyviewComponent } from './policyview.component';

describe('PolicyviewComponent', () => {
  let component: PolicyviewComponent;
  let fixture: ComponentFixture<PolicyviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
