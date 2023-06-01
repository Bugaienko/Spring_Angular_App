import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup = this.createRegisterForm();

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {

  }
  createRegisterForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    console.log(this.registerForm.value);

    this.authService.register({
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value. confirmPassword
    }).subscribe(data => {
      console.log(data);

      this.notificationService.showSnackBar('Successfully Registered!')

    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    })
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }




}
