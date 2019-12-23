import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "app-student-home",
  templateUrl: "./student-home.component.html",
  styleUrls: ["./student-home.component.css"]
})
export class StudentHomeComponent implements OnInit {
  commandForm: FormGroup;
  firstname: String;
  public currentUser;

  title = new FormControl("");
  command = new FormControl("");

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : "";
    this.firstname = this.currentUser.firstname;
  }

  ngOnInit() {
    this.commandForm = this.formBuilder.group({
      title: ["", Validators.required],
      command: ["", Validators.required]
    });
  }

  onSave() {
    console.log(this.commandForm.value.command);
    console.log(this.currentUser);

    this.authenticationService
      .command(this.commandForm.value.title, this.commandForm.value.command)
      .subscribe(
        data => {
          // console.log(data);
        },
        error => {
          alert(error.error.message);
        }
      );
  }
}
