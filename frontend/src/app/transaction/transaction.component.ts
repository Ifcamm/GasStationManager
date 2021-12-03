import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction } from '../models/user.transaction';
import { TransactionService } from '../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  transaction: Transaction = {
    identification: '',
    fueltype: '',
    paymethod: '',
    amount: '',
    price: '',
  };

  constructor(public transactionService: TransactionService) {}

  ngOnInit(): void {}

  onTransaction(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.transactionService.createTransaction(form.value);
  }
}
