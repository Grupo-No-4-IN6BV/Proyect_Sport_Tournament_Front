import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match';
import { RestLeagueService } from 'src/app/services/restLeague/rest-league.service';
import { RestTeamService } from 'src/app/services/restTeam/rest-team.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { fadeIn } from 'src/app/animations/animations';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  animations: [fadeIn]
})
export class StatisticsComponent implements OnInit {


  teams:[]
  
  public token;
  league;
  teamSelected;
  user;
  jornadaSelect;
  public match: Match;


  constructor(private restLeague: RestLeagueService,private restTeam:RestTeamService) { 
  }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.match = new Match('',0,0,0,0,0,0,'')
    this.jornadaSelect = 0;
    this.listMatch()
    
  }


  listMatch(){
    this.match.idMatch = this.jornadaSelect;
    this.restTeam.getMatches(this.league._id, this.match).subscribe((res:any)=>{
      if(res.matches){
        this.matches = res.matches;
        console.log(this.matches)
        
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message))
  }

  matches: any[]
  single: any[];
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  counter(num: number) {
    return new Array(num);
}


  
  
}



