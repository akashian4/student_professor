import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "app-professor-home",
  templateUrl: "./professor-home.component.html",
  styleUrls: ["./professor-home.component.css"]
})
export class ProfessorHomeComponent implements OnInit {
  selected=false;
  commandForm: FormGroup;
  public currentUser;
  users: any;
  commands = {};
  textcommand: string = "";
  answers = [];
  professors = [];
  title = new FormControl("");
  command = new FormControl("");
  commandid;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : "";
    this.authenticationService.getuser().subscribe(
      data => {
        // console.log(data['0'].is_student);
        this.users = data;
        for (const i of this.users) {
          if (!i.is_student) {
            this.professors.push(i);
          }
        }
      },
      error => {
        // alert(error.error.message);
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.commandForm = this.formBuilder.group({
      title: this.title,
      command: this.command
    });
  }

  onSave() {
    // console.log(this.commandForm.value.command);
    // console.log(this.currentUser);
    // console.log(this.users['3'].firstname);

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
