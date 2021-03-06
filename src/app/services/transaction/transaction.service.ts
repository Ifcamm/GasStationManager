import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/user.transaction';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment.prod';

const url = environment.apiUrl + '/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  transactions: Transaction[] = [];
  transactionsById: Transaction[] = [];
  transactionUpdated = new Subject<Transaction[]>();
  transactionsByIdUpdated = new Subject<Transaction[]>();

  constructor(private router: Router, private http: HttpClient) {}

  createTransaction(transaction: Transaction) {
    this.http
      .post(`${url}/newtransaction`, transaction)
      .subscribe((response) => {
        this.router.navigate(['/user']);
      });
  }

  getTransactions() {
    this.http
      .get<any>(`${url}`)
      .pipe(
        map((transactionsData) => {
          return transactionsData.map(
            (transaction: {
              _id: string;
              identification: string;
              fueltype: string;
              paymethod: string;
              amount: string;
              price: string;
            }) => {
              return {
                id: transaction._id,
                identification: transaction.identification,
                fueltype: transaction.fueltype,
                paymethod: transaction.paymethod,
                amount: transaction.amount,
                price: transaction.price,
              };
            }
          );
        })
      )
      .subscribe((response) => {
        this.transactions = response;
        this.transactionUpdated.next([...this.transactions].reverse());
      });
  }

  getTransactionsById(idClient: string) {
    this.http
      .get<any>(`${url}/${idClient}`)
      .pipe(
        map((transactionsData) => {
          return transactionsData.map(
            (transaction: {
              _id: string;
              identification: string;
              fueltype: string;
              paymethod: string;
              amount: string;
              price: string;
            }) => {
              return {
                id: transaction._id,
                identification: transaction.identification,
                fueltype: transaction.fueltype,
                paymethod: transaction.paymethod,
                amount: transaction.amount,
                price: transaction.price,
              };
            }
          );
        })
      )
      .subscribe((response) => {
        this.transactionsById = response;
        this.transactionsByIdUpdated.next([...this.transactionsById].reverse());
      });
  }

  deleteTransaction(id: string) {
    this.http.delete(`${url}/${id}`).subscribe((response) => {
      const transactionsFiltered = this.transactions.filter(
        (transaction) => transaction.id != id
      );
      this.transactions = transactionsFiltered;
      this.transactionUpdated.next([...this.transactions]);
    });
  }

  getTransactionsUpdatedListener() {
    return this.transactionUpdated.asObservable();
  }

  getTransactionsByIdUpdatedListener() {
    return this.transactionsByIdUpdated.asObservable();
  }
}
