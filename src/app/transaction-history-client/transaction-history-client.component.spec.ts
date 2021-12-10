import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryClientComponent } from './transaction-history-client.component';

describe('TransactionHistoryClientComponent', () => {
  let component: TransactionHistoryClientComponent;
  let fixture: ComponentFixture<TransactionHistoryClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionHistoryClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
