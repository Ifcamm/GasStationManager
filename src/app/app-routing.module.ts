import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TransactionHistoryClientComponent } from './transaction-history-client/transaction-history-client.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'createuser', component: CreateUserComponent },
  { path: 'newtransaction', component: TransactionComponent },
  { path: 'user', component: TransactionsHistoryComponent },
  { path: 'client', component: TransactionHistoryClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
