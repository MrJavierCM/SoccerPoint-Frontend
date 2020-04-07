import { TestBed } from '@angular/core/testing';

import { PubsService } from './pubs.service';

describe('PubsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PubsService = TestBed.get(PubsService);
    expect(service).toBeTruthy();
  });
});
