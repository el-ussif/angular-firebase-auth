import { TestBed } from '@angular/core/testing';

import { CustomEncryptionDecryptionService } from './custom-encryption-decryption.service';

describe('CustomEncryptionDecryptionService', () => {
  let service: CustomEncryptionDecryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomEncryptionDecryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
