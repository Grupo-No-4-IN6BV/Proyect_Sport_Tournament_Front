import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeIn, largein } from 'src/app/animations/animations';
import { Team } from 'src/app/models/team';
import { RestLeagueService } from 'src/app/services/restLeague/rest-league.service';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

export interface DialogData {
  name: string;
  id: string;
  image: string;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations: [
    fadeIn,
    largein
  ]
})
export class TeamComponent implements OnInit {

  constructor(private restLeague: RestLeagueService, private router:Router, private restTeam:RestTeamService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  teams:[]
  public token;
  league;
  teamSelected;
  user;
  btnadd:boolean;
  count=0;
  teamSelect;
  jornada: number;
  nameteamSelected: String;
  idteamSelected: String;
  imageteamSelected: String;
  

  ngOnInit(): void {
    this.teamSelected = new Team('','','',0);
    this.league = this.restLeague.getLeague();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.teams = this.league.teams;
    console.log(this.teams)
    this.count=0;
  }

  getTeam(team){
    this.teamSelected = team;
    this.nameteamSelected = this.teamSelected.name;
    this.idteamSelected = this.teamSelected._id;
    this.imageteamSelected = this.teamSelected.image;
    console.log(team)
    localStorage.setItem('team', JSON.stringify(team));
  }

  getteamselect(teamSelect){
    this.teamSelect= teamSelect;
    console.log(this.teamSelect)
  }


  getcount(i){
    console.log(i)
    if(i>=10){
      console.log(i)
      this.snackBar.open('error ', 'cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }else if(i<10){
      this.openDialog()
    }else{
      this.btnadd = true;
    }
  }

  getJorn(i){
    this.jornada = i;
    this.openMarker()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TeamSaveComponent, {
      height: '330px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openDelete(): void {
    console.log('llega aqui');
    const dialogRef = this.dialog.open(TeamRemoveComponent, {
      height: '200px',
      width: '400px',
      data: {name: this.nameteamSelected, id: this.idteamSelected}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openMarker(): void {
    const dialogRef = this.dialog.open(TeamMarkerComponent, {
      height: '500px',
      width: '700px',
      data: {jornada: this.jornada}
    });
      dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(TeamUpdateComponent, {
      height: '450px',
      width: '800px',
      data: {name: this.nameteamSelected, id: this.idteamSelected}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}

export interface teamData {
  jornada: number;
}


@Component({
  selector: 'app-team-marker',
  templateUrl: './team.marker.component.html',
  styleUrls: ['./team.component.css'],
  animations: [fadeIn],
  encapsulation: ViewEncapsulation.None
})
export class TeamMarkerComponent implements OnInit {
  selected1;
  goals1;
  selected2;
  goals2;
  jornadaSelect;
  jornadas;

  teams:[]
  public token;
  league;
  teamSelected;
  user;
  btnadd:boolean;
  count=0;
  teamSelect;


  ngOnInit(): void {
    this.teamSelected = new Team('','','',0);
    this.league = this.restLeague.getLeague();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.teams = this.league.teams;
  }

  counter() {
    this.jornadas=this.data.jornada
    this.jornadas=this.jornadas-1;
    return new Array(this.jornadas);
}

  constructor(public dialogRef: MatDialogRef<TeamMarkerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: teamData,private restLeague: RestLeagueService, private router:Router, private restTeam:RestTeamService){}

    
  getteamWin(){
    if(this.selected2=='default' ||this.selected1=='default' ){
      console.log('elige un equipo valido')
    }else if(this.goals1 < this.goals2){
      console.log('winner', this.selected2)
    }else if(this.goals1 > this.goals2){
      console.log('winner', this.selected1)
    }else if(this.goals1 = this.goals2){
      console.log('empate')
    }else {
      console.log('error')
    }
  }

}



@Component({
  selector: 'app-teamsave',
  templateUrl: './team.save.component.html',
  styleUrls: ['./team.component.css'],
  animations: [fadeIn]
})
export class TeamSaveComponent implements OnInit {

  teams:[]
  public token;
  league;
  user;
  public team: Team;
  count:number;
  limit=3;

  counter(i: number) {
    return new Array(i);
}

  constructor(public dialogRef: MatDialogRef<TeamSaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null, private restLeague: RestLeagueService, private restUser: RestUserService, private router:Router, private restTeam:RestTeamService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.team = new Team('','','',0);
    this.league = this.restLeague.getLeague();
    this.user = this.restUser.getUser();
    this.teams = this.league.teams;
  }

  getcount(i){
    this.count=i
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(saveTeam){
    this.count =this.count+1
    this.team.count = this.count
    this.restTeam.saveTeam(this.user._id,this.league._id, this.team).subscribe((res:any)=>{
      if(res.pushTeam){
        alert(res.message)
        saveTeam.reset()
        this.league = res.pushTeam;
        this.user = res.userFind;
        localStorage.setItem('league', JSON.stringify(this.league))
        localStorage.setItem('user', JSON.stringify(this.user))
      }else{
        alert(res.message)
      }
    },
    error=> alert(error.error.message))
  }
  
}

@Component({
  selector: 'app-teamremove',
  template:`Message from parent:`,
  templateUrl: './team.remove.component.html',
  styleUrls: ['./team.component.css'],
  animations: [fadeIn]
})
export class TeamRemoveComponent implements OnInit {

  league;
  teams:[];
  user;

  constructor(public dialogRef: MatDialogRef<TeamRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,  private restLeague:RestLeagueService,private restUser: RestUserService, private restTeam:RestTeamService){}


  ngOnInit(): void {
    this.league = this.restLeague.getLeague();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeTeam(){
    console.log(this.league._id);
    this.restTeam.removeTeam(this.league._id, this.data.id).subscribe((res:any)=>{
      if(res.teamPull){
        alert(res.message);
        localStorage.setItem('league', JSON.stringify(res.teamPull))
        this.league = this.restLeague.getLeague()
        this.teams = this.league.teams;
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message))
  }
}


@Component({
  selector: 'app-teamupdate',
  templateUrl: './team.update.component.html',
  styleUrls: ['./team.component.css'],
  animations: [fadeIn]
})
export class TeamUpdateComponent implements OnInit {

  league;
  teams:[];


  constructor(public dialogRef: MatDialogRef<TeamUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restTeam:RestTeamService,  private restLeague:RestLeagueService){}
    
  ngOnInit(): void {
    this.league = this.restLeague.getLeague();
    this.teams = this.league.teams;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateTeam(){
    console.log(this.data);
    this.restTeam.updateTeam(this.league._id, this.data).subscribe((res:any)=>{
      if(res.leagueFind){
        alert(res.message)
        this.league = res.leagueFind;
        localStorage.setItem('league', JSON.stringify(this.league))
        this.ngOnInit();
      }else{
        alert(res.message);
        this.league = this.restLeague.getLeague();
        this.teams = this.league.teams;
      }
    },
    error => alert(error.error.message))
  }
  
}