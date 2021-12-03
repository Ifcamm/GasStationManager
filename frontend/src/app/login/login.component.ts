import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  errorMessage = 'Este campo es requerido.';
  private isEditing = false;
  private postId!: string;

  user: User = {
    name: '',
    lastName: '',
    email: '',
    identification: '',
    phoneNumber: '',
    password: '',
  };

  constructor() {}

  ngOnInit(): void {}
  click() {}
}
