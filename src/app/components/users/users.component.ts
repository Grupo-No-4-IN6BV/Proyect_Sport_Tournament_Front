import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeIn, largein } from 'src/app/animations/animations';
import { User } from 'src/app/models/user';
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

  openDialog(): void{
    const dialogRef = this.dialog.open(UserSaveComponent, {
      height: '500px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result =>{
      this.ngOnInit();
      console.log('The dialog was closed');
    })
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

@Component({
  selector: 'app-usersave',
  templateUrl: './user.save.component.html',
  styleUrls: ['./users.component.css'],
  animations: [fadeIn]
})
export class UserSaveComponent implements OnInit {
    public token;
    public user: User;
    public message;
    public userLogg;
    public roleOptions = ['ROLE_ADMIN', 'ROLE_USER']

    constructor(private restUser:RestUserService, private router:Router, private userService:RestUserService, public snackBar: MatSnackBar) {
      this.user = new User('','','','','','','',[]);
      this.token = this.restUser.getToken();
      this.userLogg = this.restUser.getUser();
    }

    ngOnInit(): void {
      
    }

    onSubmit(saveUserByAdmin){
      this.userService.saveUserByAdmin(this.user, this.userLogg._id).subscribe((res:any)=>{
          this.message = res.message;
          if(res.userSaved){
            alert(res.message);
            this.user = new User('','','','','','','',[]);
            saveUserByAdmin.reset();
            this.snackBar.open('Usuario creado correctamente', 'cerrar', {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['mat-toolbar', 'mat-accent']
            });
          }else{
            alert(this.message);
          }
      },
      error=> console.log(<any>error)
      )
    }
}