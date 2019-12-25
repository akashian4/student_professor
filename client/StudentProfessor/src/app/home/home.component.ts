import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public currentUser;
  role: String;
  constructor(private router: Router) {
    this.currentUser = localStorage.getItem("currentUser")
      ? JSON.parse(localStorage.getItem("currentUser"))
      : "";
    console.log(this.currentUser);
    this.role = this.currentUser.is_student ? "student" : "professor";
    if (this.currentUser.is_student) {
      this.router.navigate(["/student"]);
    } else {
      this.router.navigate(["/professor"]);
    }
  }

  ngOnInit() {}
}
