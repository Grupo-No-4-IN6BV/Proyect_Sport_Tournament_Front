import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONNECTION } from '../global';
import { RestUserService } from '../restUser/rest-user.service';

@Injectable({
  providedIn: 'root'
})
export class RestTeamService {
  
  public user;
  public token;
  public league;
  public team;
  public uri: string;
  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
  };
  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }
  constructor(private restUser:RestUserService, private http:HttpClient) {
    this.uri = CONNECTION.URI;
   }

   getToken(){
    let token = localStorage.getItem('token');
    if(token != null || token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  saveTeam(idUser,idLeague, team){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(team);
    return this.http.put(this.uri+idUser+'/'+idLeague+'/setTeam', params,  {headers: headers})
    .pipe(map(this.extractData))
  }

  removeTeam(idLeague, idTeam){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri+idLeague+'/removeTeam/'+idTeam, null, {headers: headers})
    .pipe(map(this.extractData))
  }

  updateTeam(idLeague, team){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    let params = JSON.stringify(team);
    return this.http.put(this.uri+idLeague+'/updateTeam/'+team.id, params, {headers: headers})
    .pipe(map(this.extractData))
  }

  getTeam(){
    let team = JSON.parse(localStorage.getItem('team'));
    if(team != null || team != undefined){
      this.team = team;
    }else{
      this.team = null;
    }
    return this.team;     
 }
 
}