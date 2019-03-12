import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvalidUserError } from 'projects/generics/src/lib/common/error/invalid-user-error';
import { Constants } from '../common/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    user_login: new FormControl(Constants.EMPTY_SPACE, Validators.required),
    user_password: new FormControl(Constants.EMPTY_SPACE, Validators.required)
  });

  loginUserData = {};
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    localStorage.clear();
  }

  loginUser() {
    console.log('LoginComponent.userData>', this.form.value);
    this.auth.getObject(this.form.value).subscribe(
      data => {
        localStorage.setItem(Constants.TOKEN, data[0].token);
        this.router.navigate(['/home'], { skipLocationChange: true});
      },
      error => {
        if (error instanceof InvalidUserError) {
          this.form.setErrors({
            invalidLogin: true
          });
        }
      }
    );
  }
}
