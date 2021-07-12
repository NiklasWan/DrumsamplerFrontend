import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AppStateService } from 'src/app/services/app-state.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    email: [, {
      validators: [Validators.required, Validators.email],
      updateOn: "change",
    }],
    password: [, { validators: [Validators.required], updateOn: "change" }]
  });
  constructor(private formBuilder: FormBuilder, private appState: AppStateService, private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value['email'], this.registerForm.value['password']).subscribe(httpEvent => {
        if (httpEvent instanceof HttpResponse) {
          this.appState.token = httpEvent.body['token'];
        }
      }, err => {
        alert(err.error['message']);
        this.registerForm.reset();
      });
    }
  }
}
