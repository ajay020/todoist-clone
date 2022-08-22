import { TestBed } from '@angular/core/testing';

import { NavdataService } from './navdata.service';

describe('NavdataService', () => {
  let service: NavdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
