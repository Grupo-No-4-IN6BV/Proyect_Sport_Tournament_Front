import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdministrationComponent } from './components/administration/administration.component';
import { LeagueComponent, LeagueRemoveComponent, LeagueSaveComponent, LeagueUpdateComponent } from './components/league/league.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DialogOverviewExampleDialog, UserComponent, UserdeleteComponent } from './components/user/user.component';
import { MaterialModule } from './styles/material.module';
import { UserSaveComponent, UsersComponent, UserRemoveComponent, UserUpdateComponentByAdmin } from './components/users/users.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { TeamComponent, TeamMarkerComponent, TeamSaveComponent, TeamUpdateComponent, TeamRemoveComponent } from './components/team/team.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import { TableComponent } from './components/table/table.component';
import { OrderbyPPipe } from './pipe/orderbyP/orderby-p.pipe';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SideNavComponent,
    RegisterComponent,
    LoginComponent,
    AdministrationComponent,
    LeagueComponent,
    StatisticsComponent,
    UserComponent,
    DialogOverviewExampleDialog,
    UserdeleteComponent,
    LeagueSaveComponent,
    LeagueRemoveComponent,
    LeagueUpdateComponent,
    UsersComponent,
    ListUsersComponent,
    TeamComponent,
    TeamSaveComponent,
    TeamRemoveComponent, 
    TeamUpdateComponent,
    NotFoundComponent,
    TeamMarkerComponent,
    TableComponent,
    OrderbyPPipe,
    UserSaveComponent,
    UserRemoveComponent,
    UserUpdateComponentByAdmin
  ],
  entryComponents: [
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgSelectModule,
    NgxChartsModule,
    ChartsModule

  ],
  providers: [
  ],
  
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
