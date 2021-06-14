import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { fadeIn } from '../../animations/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeIn]
})
export class LoginComponent implements OnInit {

  public user: User;
  public token: string;
  public message;

  constructor(private restUser: RestUserService, private router: Router) {
    this.user = new User('','','', '', '', 'ROLE_USER', '', null);
   }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      this.message = res.message;
      if(!res.token){
        alert(this.message)
      }else{
        delete res.user.password;
        this.token = res.token;
        if(this.token.length <= 0){
          alert('el Token no se genero de manera correcta')
        }else{
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(res.user));
          console.log(res.user, res.token);
          alert('Usuario logeado exitosamente')
        }
      }
    },
    error=> this.message = error.error.message
    )
  }

}
