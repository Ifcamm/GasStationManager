import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from '../models/user.transaction';
import { TransactionService } from '../services/transaction/transaction.service';
import { UserService } from '../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.css'],
})
export class TransactionsHistoryComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  transactionsById: Transaction[] = [];

  transactionsSub: Subscription;
  transactionsByIdSub: Subscription;
  isAuth: boolean = false;
  userRole: string = '';
  authSub!: Subscription;

  dataSource: any;

  constructor(
    public transactionService: TransactionService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.transactionsSub = this.transactionService
      .getTransactionsUpdatedListener()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      });
    this.transactionsByIdSub = this.transactionService
      .getTransactionsByIdUpdatedListener()
      .subscribe((transactionsById: Transaction[]) => {
        this.transactionsById = transactionsById;
      });
  }

  ngOnInit(): void {
    this.isAuth = this.userService.getIsAuthenticated();
    this.onLogin(this.isAuth);
    this.authSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus: boolean) => {
        this.isAuth = authStatus;
        this.onLogin(authStatus);
      });
  }

  onLogin(authStatus: boolean) {
    this.userRole = this.userService.getUserRole();
    if (
      authStatus === true &&
      (this.userRole === 'user' || this.userRole === 'superuser')
    ) {
      this.transactionService.getTransactions();
      this.transactionsSub = this.transactionService
        .getTransactionsUpdatedListener()
        .subscribe((transactions: Transaction[]) => {
          this.transactions = transactions;
        });
    }
    if (authStatus === true && this.userRole === 'client')
      this.transactionService.getTransactionsById(
        this.userService.getIdentification()
      );
    this.transactionsByIdSub = this.transactionService
      .getTransactionsByIdUpdatedListener()
      .subscribe((transactionsById: Transaction[]) => {
        this.transactionsById = transactionsById;
      });
  }

  ngOnDestroy(): void {
    this.transactionsSub.unsubscribe();
    this.transactionsByIdSub.unsubscribe();
  }

  onDelete(id: string) {
    this.transactionService.deleteTransaction(id);
  }
}
