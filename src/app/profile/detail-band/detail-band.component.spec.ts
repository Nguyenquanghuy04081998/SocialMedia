import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBandComponent } from './detail-band.component';

describe('DetailBandComponent', () => {
  let component: DetailBandComponent;
  let fixture: ComponentFixture<DetailBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
