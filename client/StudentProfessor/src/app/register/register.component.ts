// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';

// import { UserService } from '../_services/user.service';

//   constructor(
//
//     private router: Router,
//     private userService: UserService,
//     private toastr: ToastrService
//   ) { }
//

//

//   onFormSubmit(){

//     this.userService.register(this.registerForm.value).subscribe(
//       (data)=>{
//         alert('User Registered successfully!!');
//         this.router.navigate(['/login']);
//      },
//       (error)=>{
//         this.toastr.error(error.error.message, 'Error');
//         this.loading = false;
//       }
//     )

import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;

  firstname = new FormControl("", [Validators.required]);
  lastname = new FormControl("", [Validators.required]);
  phone = new FormControl("", [
    Validators.minLength(11),
    Validators.maxLength(11)
  ]);
  email = new FormControl("");
  username = new FormControl("", [Validators.required]);
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);
  is_student=new FormControl("student");

  registerForm: FormGroup = this.builder.group({
    firstname: this.firstname,
    lastname: this.lastname,
    phone: this.phone,
    email: this.email,
    username: this.username,
    password: this.password,
    is_student: this.is_student
  });

  get fval() {
    return this.registerForm.controls;
  }

  constructor(private builder: FormBuilder) {}

  ngOnInit() {}
  onFormSubmit() {
    this.submitted = true;
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.registerForm.value);
  }
}
