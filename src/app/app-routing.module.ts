import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './components/administration/administration.component';
import { HomeComponent } from './components/home/home.component';
import { LeagueComponent } from './components/league/league.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TeamComponent } from './components/team/team.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'administration', component: AdministrationComponent},
  {path: 'league', component: LeagueComponent},
  {path: 'list-users', component: ListUsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'statistics', component: StatisticsComponent},
  {path: 'user', component: UserComponent},
  {path: 'users', component: UsersComponent},
  {path: ':id/teams', component: TeamComponent},
  {path: 'not-found', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
