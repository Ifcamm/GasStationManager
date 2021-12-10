import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from '../models/user.transaction';
import { TransactionService } from '../services/transaction/transaction.service';
import { UserService } from '../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-transaction-history-client',
  templateUrl: './transaction-history-client.component.html',
  styleUrls: ['./transaction-history-client.component.css'],
})
export class TransactionHistoryClientComponent implements OnInit, OnDestroy {
  transactionsById: Transaction[] = [];
  transactionsByIdSub: Subscription;
  isAuth: boolean = false;
  userRole: string = '';
  authSub!: Subscription;
  userIdentification: string = '';

  constructor(
    public transactionService: TransactionService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
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
    if (authStatus === true && this.userRole === 'client')
      this.transactionService.getTransactionsById(
        this.userService.getIdentification()
      );
    this.transactionsByIdSub = this.transactionService
      .getTransactionsByIdUpdatedListener()
      .subscribe((transactionsById: Transaction[]) => {
        this.transactionsById = transactionsById;
      });
    this.userIdentification = this.userService.getIdentification();
  }

  ngOnDestroy(): void {
    this.transactionsByIdSub.unsubscribe();
  }
}
