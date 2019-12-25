import { ProfessorHomeComponent } from "./professor-home/professor-home.component";
import { StudentHomeComponent } from "./student-home/student-home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./_helper/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: "student",
        component: StudentHomeComponent,
        data: {roles: ['student']}
      },
      {
        path: "professor",
        component: ProfessorHomeComponent,
        data: {roles: ['professor']}
      }
    ]
    
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
