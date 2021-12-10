import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from '../models/user.transaction';
import { TransactionService } from '../services/transaction/transaction.service';
import { UserService } from '../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  columnsToDisplay = [
    'identification',
    'paymethod',
    'fueltype',
    'amount',
    'price',
    'actions',
  ];

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
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    this.isAuth = this.userService.getIsAuthenticated();
    this.onLogin(this.isAuth);
    this.authSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus: boolean) => {
        this.isAuth = authStatus;
        this.onLogin(authStatus);
        this.dataSource = new MatTableDataSource<Transaction>(
          this.transactions
        );
        this.dataSource.paginator = this.paginator;
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
          this.dataSource = new MatTableDataSource<Transaction>(
            this.transactions
          );
          this.dataSource.paginator = this.paginator;
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
        this.dataSource = new MatTableDataSource<Transaction>(
          this.transactionsById
        );
        this.dataSource.paginator = this.paginator;
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
