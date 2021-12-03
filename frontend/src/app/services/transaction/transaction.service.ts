import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/user.transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  url = 'http://localhost:3000/api/users';

  constructor(private router: Router, private http: HttpClient) {}

  createTransaction(transaction: Transaction) {
    this.http
      .post(`${this.url}/transaction`, transaction)
      .subscribe((response) => {
        console.log(response);
        // this.router.navigate(['/index']);
      });
  }
}
