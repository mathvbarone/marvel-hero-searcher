import { TestBed, inject } from '@angular/core/testing';

import { MarvelService } from './marvel-service.service';

describe('SpotifyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarvelService]
    });
  });

  it('should be created', inject([MarvelService], (service: MarvelService) => {
    expect(service).toBeTruthy();
  }));
});
