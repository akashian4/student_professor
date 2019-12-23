

import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css",
  "./toastr.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  username = new FormControl("");
  password = new FormControl("");

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  get fval() {
    return this.loginForm.controls;
  }
  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    
    this.authenticationService
      .login(this.loginForm.value.username , this.loginForm.value.password)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(["/"]);
        },
        error => {
          this.toastr.error(error.error.message, "Error");
          alert(error.error.message,)
          this.loading = false;
        }
      );
  }
}
