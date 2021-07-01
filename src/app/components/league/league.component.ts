import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fadeIn, largein } from 'src/app/animations/animations';
import { League } from 'src/app/models/league';
import { Team } from 'src/app/models/team';
import { RestLeagueService } from 'src/app/services/restLeague/rest-league.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';


export interface DialogData {

  name: string;
  id: string;
  image: string;
  idUser: string;
  role: string;
}

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
  animations: [
    fadeIn,
    largein
  ],
})
export class LeagueComponent implements OnInit {

  panelOpenState = false;
  leagues:[];
  user;
  leagueSelected:League;
  parentMessage: string;
  nameleagueSelected: String;
  idleagueSelected: String;
  imageleagueSelected: String;
  
  

  constructor(private restUser:RestUserService, private router:Router,  private restLeague:RestLeagueService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.leagueSelected = new League('','','',[], '');
    this.user = this.restUser.getUser();
    this.leagues = this.user.leagues;
    console.log(this.leagues)
  }

  getLeague(league){
    this.leagueSelected = league;
    this.nameleagueSelected = this.leagueSelected.name;
    this.idleagueSelected = this.leagueSelected._id;
    this.imageleagueSelected = this.leagueSelected.user;


  }

  goTeam(league){
    this.router.navigate([league._id,'teams']);
  }

  prueba(){
    this.ngOnInit()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LeagueSaveComponent, {
      height: '330px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }

  openDelete(): void {
    const dialogRef = this.dialog.open(LeagueRemoveComponent, {
      height: '200px',
      width: '400px',
      data: {name: this.nameleagueSelected, id: this.idleagueSelected, idUser: this.user._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(LeagueUpdateComponent, {
      height: '450px',
      width: '800px',
      data: {name: this.nameleagueSelected, id: this.idleagueSelected, idUser: this.user._id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}


@Component({
  selector: 'league-admin-app',
  templateUrl: 'league.admin.component.html',
  styleUrls: ['./league.component.css'],
  animations: [
    fadeIn,
    largein
  ],
})

export class LeagueAdminComponent implements OnInit {

  panelOpenState = false;
  leagues:[];
  user;
  leagueSelected:League;
  parentMessage: string;
  nameleagueSelected: String;
  idleagueSelected: String;
  imageleagueSelected: String;
  search;
  searchforL;
  

  constructor( private router:Router,  private restLeague:RestLeagueService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listLeagues()
    this.leagueSelected = new League('','','',[], '');
  }
  getLeague(league){
    console.log(league)
    this.leagueSelected = league;
    this.nameleagueSelected = this.leagueSelected.name;
    this.idleagueSelected = this.leagueSelected._id;
    this.imageleagueSelected = this.leagueSelected.image;
    console.log(this.leagueSelected.user)

  }

  goTeam(league){
    this.router.navigate([league._id,'teams']);
  }


  listLeagues(){
    this.restLeague.getLeagues().subscribe((res:any)=>{
      if(res.leagues){
        this.leagues = res.leagues
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LeagueSaveComponent, {
      height: '330px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }

  openDelete(): void {
    const dialogRef = this.dialog.open(LeagueRemoveComponent, {
      height: '200px',
      width: '400px',
      data: {name: this.nameleagueSelected, id: this.idleagueSelected, idUser: this.leagueSelected.user, role:'Admin'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(LeagueUpdateComponent, {
      height: '450px',
      width: '800px',
      data: {name: this.nameleagueSelected, id: this.idleagueSelected, idUser: this.leagueSelected.user, role:'Admin'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}




@Component({
  selector: 'app-leagueupdate',
  templateUrl: './league.update.component.html',
  styleUrls: ['./league.component.css'],
  animations: [fadeIn]
})
export class LeagueUpdateComponent implements OnInit {

  leagues:[];
  user;

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.leagues = this.user.leagues;
  }

  

  constructor(public dialogRef: MatDialogRef<LeagueUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restUser:RestUserService,  private restLeague:RestLeagueService){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateLeague(){
    this.restLeague.updateLeague(this.data.idUser, this.data).subscribe((res:any)=>{
      if(res.userLeagueAct){
        alert(res.message)
        this.user= res.userLeagueAct
        if(this.data.role == 'Admin'){
          this.dialogRef.close();
        }else{
          localStorage.setItem('user', JSON.stringify(this.user));
          this.ngOnInit();
        }
        
      }else{
        alert(res.message);
        this.user = this.restUser.getUser()
        this.leagues = this.user.leagues;
      }
    },
    error => alert(error.error.message))
  }
  
}

@Component({
  selector: 'app-leagueremove',
  template:`Message from parent:`,
  templateUrl: './league.remove.component.html',
  styleUrls: ['./league.component.css'],
  animations: [fadeIn]
})
export class LeagueRemoveComponent implements OnInit {


  leagues:[];
  user;
  

  constructor(public dialogRef: MatDialogRef<LeagueRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restUser:RestUserService,  private restLeague:RestLeagueService){}


  ngOnInit(): void {
    this.user = this.restUser.getUser();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeLeague(){
    this.restLeague.removeLeague(this.data.idUser, this.data.id).subscribe((res:any)=>{
      if(res.leaguePull){
        alert(res.message);
        if(this.data.role == 'Admin'){
          this.dialogRef.close();
        }else{
        localStorage.setItem('user', JSON.stringify(res.leaguePull))
        this.user = this.restUser.getUser()
        this.leagues = this.user.leagues;
        }
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message))
  }

}




@Component({
  selector: 'app-leaguesave',
  templateUrl: './league.save.component.html',
  styleUrls: ['./league.component.css'],
  animations: [fadeIn]
})
export class LeagueSaveComponent implements OnInit {

  public league: League;
  public team: Team;
  public leagueLogg;
  public token;
  public user;

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();

  }

  constructor(private restUser:RestUserService, private router:Router, private restLeague:RestLeagueService) {
    this.league = new League('','','',[], '');
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  onSubmit(saveLeague){
    this.restLeague.saveLeague(this.user._id, this.league).subscribe((res:any)=>{
      if(res.userFind2){
        alert(res.message)
        saveLeague.reset()
        delete res.pushLeague.password;
        this.user = res.userFind2;
        localStorage.setItem('user', JSON.stringify(this.user));
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message))
  }
}

