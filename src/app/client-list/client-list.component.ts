import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionService } from '../services/transaction/transaction.service';
import { UserService } from '../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit, OnDestroy {
  users: User[] = [];

  usersSub: Subscription;
  isAuth: boolean = false;
  userRole: string = '';
  authSub!: Subscription;
  dataSource: any;

  columnsToDisplay = [
    '_id',
    'name',
    'lastName',
    'identification',
    'phoneNumber',
    'role',
    'actions',
  ];
  constructor(
    public transactionService: TransactionService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.usersSub = this.userService
      .getusersUpdatedListener()
      .subscribe((users: User[]) => {
        this.users = users;
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
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
      });
  }

  onLogin(authStatus: boolean) {
    this.userRole = this.userService.getUserRole();
    if (authStatus === true && this.userRole === 'superuser') {
      this.userService.getUsers('/allclients');
      this.usersSub = this.userService
        .getusersUpdatedListener()
        .subscribe((users: User[]) => {
          this.users = users;
          this.dataSource = new MatTableDataSource<User>(this.users);
          this.dataSource.paginator = this.paginator;
        });
    }
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }

  onDelete(id: string) {
    this.transactionService.deleteTransaction(id);
  }
}
