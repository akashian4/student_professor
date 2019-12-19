
// import { Router, ActivatedRoute } from '@angular/router';

// import { ToastrService } from 'ngx-toastr';

// import { AuthenticationService } from '../_services';


  
//   constructor(

//     private router: Router,
//     private authenticationService : AuthenticationService,
//     private toastr: ToastrService
//   ) { }




//   onFormSubmit() {
//     
//      this.authenticationService.login(this.fval.email.value, this.fval.password.value)
//         .subscribe(
//             data => {
//               this.router.navigate(['/']);
//             },
//             error => {
//               this.toastr.error(error.error.message, 'Error');
//                 this.loading = false;
//             });
//   }
// }







import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  username=new FormControl('');
  password=new FormControl('');
  
  
  constructor(
    private formBuilder: FormBuilder,
   
   
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  get fval() { return this.loginForm.controls; }
  onFormSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
  }

}
