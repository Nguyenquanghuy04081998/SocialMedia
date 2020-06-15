import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaiPostComponent } from './detai-post.component';

describe('DetaiPostComponent', () => {
  let component: DetaiPostComponent;
  let fixture: ComponentFixture<DetaiPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetaiPostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaiPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
