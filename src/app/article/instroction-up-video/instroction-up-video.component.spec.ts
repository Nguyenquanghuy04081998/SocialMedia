import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstroctionUpVideoComponent } from './instroction-up-video.component';

describe('InstroctionUpVideoComponent', () => {
  let component: InstroctionUpVideoComponent;
  let fixture: ComponentFixture<InstroctionUpVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstroctionUpVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstroctionUpVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
