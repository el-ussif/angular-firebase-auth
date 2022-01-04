import { TestBed } from '@angular/core/testing';

import { ServerBridgeService } from './server-bridge.service';

describe('ServerBridgeService', () => {
  let service: ServerBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
