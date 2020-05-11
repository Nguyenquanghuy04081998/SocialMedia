import { TestBed } from '@angular/core/testing';

import { EditorDeactiveGuard } from './editor-deactive.guard';

describe('EditorDeactiveGuard', () => {
  let guard: EditorDeactiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditorDeactiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
