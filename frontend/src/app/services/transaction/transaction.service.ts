import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/user.transaction';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  url = 'http://localhost:3000/api';
  transactions: Transaction[] = [];
  transactionUpdated = new Subject<Transaction[]>();

  constructor(private router: Router, private http: HttpClient) {}

  createTransaction(transaction: Transaction) {
    this.http
      .post(`${this.url}/users/transaction`, transaction)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }

  getTransactions() {
    this.http
      .get<any>(`${this.url}/transactions`)
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
        console.log(response);
        this.transactions = response;
        this.transactionUpdated.next([...this.transactions]);
      });
  }

  deleteTransaction(id: string){
    this.http.delete(`${this.url}/transactions/${id}`).subscribe((response) =>{
      console.log(response);
      const transactionsFiltered = this.transactions.filter((transaction) => transaction.id != id);
      this.transactions = transactionsFiltered;
      this.transactionUpdated.next([...this.transactions]);
    })
  }

  getTransactionsUpdatedListener() {
    return this.transactionUpdated.asObservable();
  }
}
