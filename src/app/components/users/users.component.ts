import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeIn, largein } from 'src/app/animations/animations';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

export interface DialogData {
  id: string,
  name: string,
  username: string,
  password: string,
  email: string,
  role: string,
  image: string,
  leagues: []
}

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
  userSelect;
  userSelected: User;
  nameUserSelected: String;
  usernameUserSelected: String;
  emailUserSelected: String;
  userRoleSelected: String;
  iduserSelected: String;
  imageuserSelected: String;

  constructor(private restUser:RestUserService, private router:Router, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listUsers();
    this.userSelected = new User('','','','','','','',[]);
  }

  getUserSelect(user){
    this.userSelected = user;
    this.nameUserSelected = this.userSelected.name;
    this.usernameUserSelected = this.userSelected.username;
    this.emailUserSelected = this.userSelected.email;
    this.userRoleSelected = this.userSelected.role;
    this.iduserSelected = this.userSelected._id;
    this.imageuserSelected = this.userSelected.image;
    console.log(user)
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

  openDelete(): void {
    console.log('llega aqui');
    const dialogRef = this.dialog.open(UserRemoveComponent, {
      height: '200px',
      width: '400px',
      data: {username: this.usernameUserSelected, id: this.iduserSelected}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openUpdate(): void {
    const dialogRef = this.dialog.open(UserUpdateComponentByAdmin, {
      height: '450px',
      width: '800px',
      data: {name: this.nameUserSelected, username: this.usernameUserSelected, email: this.emailUserSelected, role: this.userRoleSelected, id: this.iduserSelected}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  listUsers(){
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res.users){
        this.users = res.users.reverse();
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

@Component({
  selector: 'app-userremove',
  template:`Message from parent:`,
  templateUrl: './user.remove.component.html',
  styleUrls: ['./users.component.css'],
  animations: [fadeIn]
})
export class UserRemoveComponent implements OnInit {

  league;
  public user;
  userSelect;
  public token;
  public userLogg;

  constructor(public dialogRef: MatDialogRef<UserRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,  private restUser:RestUserService){}
  

  ngOnInit(): void {
    this.userLogg = this.restUser.getUser();
    this.token = this.restUser.getToken();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  removeUserByAdmin(){
    this.restUser.removeUserByAdmin(this.data.id, this.userLogg._id).subscribe((res:any)=>{
      if(res.userRemoved){
        alert(res.message);

      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message))
  }
}

@Component({
  selector: 'app-userupdatebyadmin',
  templateUrl: './user.update.component.html',
  styleUrls: ['./users.component.css'],
  animations: [fadeIn]
})
export class UserUpdateComponentByAdmin implements OnInit {

  leagues:[];
  user;
  userSelect;
  public token;
  public userLogg;
  public roleOptions = ['ROLE_ADMIN', 'ROLE_USER']

  ngOnInit(): void {
    this.userLogg = this.restUser.getUser();
    this.token = this.restUser.getToken();
  }

  constructor(public dialogRef: MatDialogRef<UserUpdateComponentByAdmin>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restUser:RestUserService){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  userUpdateByAdmin(){
    this.restUser.userUpdateByAdmin(this.data.id, this.data, this.userLogg._id).subscribe((res:any)=>{
      if(res.userUpdated){
        alert(res.message)
        this.user= res.userUpdated
        this.ngOnInit();
      }else{
        alert(res.message);
      }
    },
    error => alert(error.error.message))
  }
  
}