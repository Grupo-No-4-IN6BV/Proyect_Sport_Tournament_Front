import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeIn, largein } from 'src/app/animations/animations';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    fadeIn,
    largein
  ]
})
export class UsersComponent implements OnInit {
  
  users:[];

  constructor(private restUser:RestUserService, private router:Router, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(){
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res.users){
        this.users = res.users;
        console.log(res.users)
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message))
  }

}
