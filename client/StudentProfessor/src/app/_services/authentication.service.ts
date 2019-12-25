import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../_models/User";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  httpOptions: any;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  answer(commandid: string, text_answer) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "x-auth": this.currentUserSubject.value.token
      })
    };

    return this.http
      .post<any>(
        "api/answer",
        { commandid , text_answer },
        this.httpOptions
      )
      .pipe(
        map(res => {
          alert(res["massage"]);
          // console.log(res);
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`auth/login`, { username, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            // store user details in local storage to keep user logged in
            localStorage.setItem("currentUser", JSON.stringify(user.result));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  command(title: String, text_command: String) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "x-auth": this.currentUserSubject.value.token
      })
    };

    return this.http
      .post<any>(`api/command`, { title, text_command }, this.httpOptions)
      .pipe(
        map(res => {
          alert(res["massage"]);
        })
      );
  }

  getuser() {
    this.httpOptions = {
      headers: new HttpHeaders({
        "x-auth": this.currentUserSubject.value.token
      })
    };
    return this.http.get<any>(`api/user`, this.httpOptions).pipe(
      map(res => {
        return res;
      })
    );
  }

  logout() {
    // remove user data from local storage for log out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
