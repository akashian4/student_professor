import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "app-professor-home",
  templateUrl: "./professor-home.component.html",
  styleUrls: ["./professor-home.component.css"]
})
export class ProfessorHomeComponent implements OnInit {
  commandForm: FormGroup;
  public currentUser;
  users: any;
  commands = {};
  textcommand: string = "";
  answers: string = "";

  title = new FormControl("");
  command = new FormControl("");

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
    //     for(var index=0;i.answers.length;index++){
    //       // this.answers=i.answers['index'].name+"\n";
    //       // this.answers=i.answers['index'].text_answer+"\n";

    //     }
    this.answers = "";
    for (const index of i.answers) {
      this.answers += "[(name : " +index.name + ")" + "\n" +"(date : " +index.date + ")]" + "\n"+ "text_answer :" +index.text_answer + "\n";
      
      // console.log(index);
    }
    console.log(this.answers);
    // this.answers=i.answers['0'].name;
    // console.log(i.answers);
    this.textcommand = "[(title : " +i.title + ")" + "\n" +"(date : " +i.date + ")]" + "\n"+ "text_command"+ i.text_command;
    // console.log(this.textcommand);
  }
}
