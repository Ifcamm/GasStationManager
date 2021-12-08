import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  hide = true;

  user: User = {
    name: '',
    lastName: '',
    email: '',
    identification: '',
    phoneNumber: '',
    password: '',
    role: '',
  };

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.userService.createUser(form.value);
  }
}
