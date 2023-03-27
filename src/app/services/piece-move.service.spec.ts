import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { PieceMoveService } from './piece-move.service';

describe('PieceMoveService', () => {
  let service: PieceMoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceMoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
