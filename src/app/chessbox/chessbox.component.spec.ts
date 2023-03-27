import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessboxComponent } from './chessbox.component';

describe('ChessboxComponent', () => {
  let component: ChessboxComponent;
  let fixture: ComponentFixture<ChessboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChessboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChessboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
