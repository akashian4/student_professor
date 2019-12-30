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
  selected=false;
  public currentUser;
  users: any;
  textcommand: string = "";
  answers = [];
  commandid;
  professors = [];
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
        for (const i of this.users) {
          if (!i.is_student) {
            this.professors.push(i);
          }
        }
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
    this.selected=true;
    this.commandid = i._id;

    this.answers = [];
    for (const index of i.answers) {
      // this.answers += "[(name : " +index.name + ")" + "\n" +"(date : " +index.date + ")]" + "\n"+ "text_answer :" +index.text_answer + "\n";
      this.answers.push(
        `[(name : ${index.name})(date : ${index.date})] text_answer : ${index.text_answer}.`
      );
    }
    this.textcommand =
      "[(title : " +
      i.title +
      ")" +
      "\n" +
      "(date : " +
      i.date +
      ")]" +
      "\n" +
      "text_command : " +
      i.text_command;
  }

  getboarder(i){
    if(this.commandid==i._id){
      return "1px solid red";
    }
  }
}
