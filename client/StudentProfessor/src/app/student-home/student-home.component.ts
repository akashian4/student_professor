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
  public currentUser;
  users: any;
  textcommand: string = "";
  answers: string = "";
  commandid;

  answerForm: FormGroup;
  textanswer = new FormControl("");

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : "";
    this.authenticationService.getuser().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.answerForm = this.formBuilder.group({
      textanswer: this.textanswer
    });
  }

  onSubmit() {
    this.authenticationService
      .answer(this.commandid, this.textanswer.value)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          alert(error.error.message);
        }
      );
  }

  onclick(i) {
    this.commandid = i._id;

    this.answers = "";
    for (const index of i.answers) {
      this.answers += index.name + "\n" + "\t";
      this.answers += index.text_answer + "\n";
    }
    // console.log(this.answers);
    this.textcommand = i.title + "\n" + "\n" + i.text_command;
  }
}
