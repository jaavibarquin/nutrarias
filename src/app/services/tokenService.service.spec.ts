/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenService } from './tokenService.service';

describe('Service: TokenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService]
    });
  });

  it('should ...', inject([TokenService], (service: TokenService) => {
    expect(service).toBeTruthy();
  }));
});
