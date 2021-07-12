import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStateService } from 'src/app/services/app-state.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: [, {
      validators: [Validators.required, Validators.email],
      updateOn: "change",
    }],
    password: [, { validators: [Validators.required], updateOn: "change" }]
  });
  
  constructor(private formBuilder: FormBuilder, private appState: AppStateService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value['email'], this.loginForm.value['password']).subscribe(httpEvent => {
        if (httpEvent instanceof HttpResponse) {
          this.appState.token = httpEvent.body['token'];
        }
      }, err => {
        alert(err.error['message']);
        this.loginForm.reset();
      });
    }
  }
}
