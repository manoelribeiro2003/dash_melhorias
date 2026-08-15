import { TestBed } from '@angular/core/testing';

import { ConvertJson } from './convert-json';

describe('ConvertJson', () => {
  let service: ConvertJson;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertJson);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
