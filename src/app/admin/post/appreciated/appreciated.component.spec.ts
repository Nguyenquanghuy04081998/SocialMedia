import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppreciatedComponent } from './appreciated.component';

describe('AppreciatedComponent', () => {
  let component: AppreciatedComponent;
  let fixture: ComponentFixture<AppreciatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppreciatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppreciatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
