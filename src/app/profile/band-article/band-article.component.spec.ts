import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandArticleComponent } from './band-article.component';

describe('BandArticleComponent', () => {
  let component: BandArticleComponent;
  let fixture: ComponentFixture<BandArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
