import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { fadeIn, largein } from 'src/app/animations/animations';
import { League } from 'src/app/models/league';
import { RestLeagueService } from 'src/app/services/restLeague/rest-league.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';


export interface DialogData {

  name: string;
  id: string;
  image: string;
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
    this.parentMessage = "message from parent"
  }

  ngOnInit(): void {
    this.leagueSelected = new League('','','',[]);
    this.user = this.restUser.getUser();
    this.leagues = this.user.leagues;
    console.log(this.leagues)
  }

  getLeague(league){
    this.leagueSelected = league;
    this.nameleagueSelected = this.leagueSelected.name;
    this.idleagueSelected = this.leagueSelected._id;
    this.imageleagueSelected = this.leagueSelected.image;
    console.log(league)
  }

  goTeam(league){
    this.leagueSelected = league;
    localStorage.setItem('league', JSON.stringify(league));
    this.router.navigateByUrl('league/teams');
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
      height: '280px',
      width: '400px',
      data: {name: this.nameleagueSelected, id: this.idleagueSelected}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(LeagueUpdateComponent, {
      height: '450px',
      width: '800px',
      data: {name: this.nameleagueSelected, id: this.idleagueSelected}
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
    this.restLeague.updateLeague(this.user._id, this.data).subscribe((res:any)=>{
      if(res.userLeagueAct){
        alert(res.message)
        this.user= res.userLeagueAct
        localStorage.setItem('user', JSON.stringify(this.user));
        this.ngOnInit();
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
    this.restLeague.removeLeague(this.user._id, this.data.id).subscribe((res:any)=>{
      if(res.leaguePull){
        alert(res.message);
        localStorage.setItem('user', JSON.stringify(res.leaguePull))
        this.user = this.restUser.getUser()
        this.leagues = this.user.leagues;
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
  public leagueLogg;
  public token;
  public user;

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();

  }

  constructor(private restUser:RestUserService, private router:Router, private restLeague:RestLeagueService) {
    this.league = new League('','','',[]);
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  onSubmit(saveLeague){
    this.restLeague.saveLeague(this.user._id, this.league).subscribe((res:any)=>{
      if(res.pushLeague){
        alert(res.message)
        saveLeague.reset()
        delete res.pushLeague.password;
        this.user = res.pushLeague;
        localStorage.setItem('user', JSON.stringify(this.user));
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message))
  }
}

