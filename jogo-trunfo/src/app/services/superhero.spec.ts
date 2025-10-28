import { TestBed } from '@angular/core/testing';

import { Superhero } from './superhero';

describe('Superhero', () => {
  let service: Superhero;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Superhero);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
