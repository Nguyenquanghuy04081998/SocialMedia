import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoorlyComponent } from './poorly.component';

describe('PoorlyComponent', () => {
  let component: PoorlyComponent;
  let fixture: ComponentFixture<PoorlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PoorlyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoorlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
