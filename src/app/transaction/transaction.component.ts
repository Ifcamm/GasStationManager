import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction } from '../models/user.transaction';
import { TransactionService } from '../services/transaction/transaction.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  transaction: Transaction = {
    id: '',
    identification: '',
    fueltype: '',
    paymethod: '',
    amount: '',
    price: '',
  };

  constructor(
    public transactionService: TransactionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onTransaction(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.transactionService.createTransaction(form.value);
  }
}
