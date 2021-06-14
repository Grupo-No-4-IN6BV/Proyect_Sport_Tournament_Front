import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {

  public uri: string;
  public token;
  public user;

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
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

  getUser(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user != null || user != undefined){
      this.user = user;
    }else{
      this.user = null;
    }
    return this.user;
  }

  login(user, tokenStatus){
    user.gettoken = tokenStatus;
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'login', params, this.httpOptions)
    .pipe(map(this.extractData))
  }

  register(user){
    let params = JSON.stringify(user);
    return this.http.post(this.uri + 'register', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

}
