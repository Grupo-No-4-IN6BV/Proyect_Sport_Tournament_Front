import { Component, Inject, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { CONNECTION } from 'src/app/services/global';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn]
})
export class UserComponent implements OnInit {

  value = '';
  public edit:boolean = false;
  public title;
  public user:User;
  public token;
  public possiblePass;
  public filesToUpload:Array<File>;
  public message;
  public status:boolean;
  public uri;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  
  ngOnInit() {
    this.edit = false;
    this.user = this.restUser.getUser();
  }
  editarbtn(){
    this.edit=true;
  }
  canceledit(){
    this.edit=false;
    this.ngOnInit();
    this.snackBar.open('Usuario no actualizado', 'cerrar', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }

  animal: string;
  name: string;

  constructor( private restUser:RestUserService, private router:Router, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.title = 'Your Account';
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.possiblePass = '';
    this.uri = CONNECTION.URI;
  }

  update(){
    delete this.user.password;
    delete this.user.role;
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
        this.snackBar.open(this.message, 'cerrar', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['mat-toolbar', 'mat-accent']
        });
        this.ngOnInit();
      }else{
        this.status = false;
        this.message = res.message;
        this.user = this.restUser.getUser();
      }
    },
    error=> alert(error.error.message))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '450px',
      width: '800px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeIn]
})
export class DialogOverviewExampleDialog implements OnInit {

  public title;
  public user:User;
  public token;
  public possiblePass;
  public filesToUpload:Array<File>;
  public message;
  public status:boolean;
  public uri;
  selected = 'option2';
  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private restUser:RestUserService,) {
      this.title = 'Your Account';
      this.user = this.restUser.getUser();
      this.token = this.restUser.getToken();
      this.possiblePass = '';
      this.uri = CONNECTION.URI;
    }

  onNoClick(): void {
    this.dialogRef.close();
    this.ngOnInit();
  }
  ngOnInit() {
    this.user = this.restUser.getUser();
  }

  option1(){
    delete this.user.password;
    delete this.user.role;
    this.user.image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ad944b60-96dc-4ae5-9486-f981d5842975/dnmhds-5de87061-b831-4603-88c0-16d982819ace.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FkOTQ0YjYwLTk2ZGMtNGFlNS05NDg2LWY5ODFkNTg0Mjk3NVwvZG5taGRzLTVkZTg3MDYxLWI4MzEtNDYwMy04OGMwLTE2ZDk4MjgxOWFjZS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.SEphl4qUCzfEPzOlIbD0E0dACrOBWrdOmPmQl1VimO4";
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }
    },
    error=> alert(error.error.message))
  }
  option2(){
    delete this.user.password;
    delete this.user.role;
    this.user.image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ad681efb-9a82-4936-89ae-2511d59e9fe2/d825rzm-728f9af8-df00-46f2-b2ad-4b4ea4c08c7a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FkNjgxZWZiLTlhODItNDkzNi04OWFlLTI1MTFkNTllOWZlMlwvZDgyNXJ6bS03MjhmOWFmOC1kZjAwLTQ2ZjItYjJhZC00YjRlYTRjMDhjN2EuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.eXawzcE16IMd7euRNiLTsUFfuDAS5pqAk8t43yKT46Y";
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }
    },
    error=> alert(error.error.message))
  }
  option3(){
    delete this.user.password;
    delete this.user.role;
    this.user.image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0225aee6-d4bc-4ca7-9247-30fcfd1b96e0/d77g23h-da0df763-9866-4788-8a1f-17f3efc2054f.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyMjVhZWU2LWQ0YmMtNGNhNy05MjQ3LTMwZmNmZDFiOTZlMFwvZDc3ZzIzaC1kYTBkZjc2My05ODY2LTQ3ODgtOGExZi0xN2YzZWZjMjA1NGYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.eOsZK0pzWVp0BGpX9c_qJ70Oo-7I-dE400-VFjqQDP8";
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }
    },
    error=> alert(error.error.message))
  }
  option4(){
    delete this.user.password;
    delete this.user.role;
    this.user.image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4ddabef1-8390-424a-a828-f61e4df3d499/d581jri-fb1c4e4e-8e18-410d-8834-a9b19c2fc431.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRkZGFiZWYxLTgzOTAtNDI0YS1hODI4LWY2MWU0ZGYzZDQ5OVwvZDU4MWpyaS1mYjFjNGU0ZS04ZTE4LTQxMGQtODgzNC1hOWIxOWMyZmM0MzEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4Tynr9xjdPqoLfgNlq2XptCpoOur4sMernkWwW-W7kg";
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }
    },
    error=> alert(error.error.message))
  }
  option5(){
    delete this.user.password;
    delete this.user.role;
    this.user.image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/55b36579-26e0-4258-8c22-97e54f614a6d/d7wfi0n-a3fe4d90-a4fd-4de3-a6c1-0ca254c424d3.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU1YjM2NTc5LTI2ZTAtNDI1OC04YzIyLTk3ZTU0ZjYxNGE2ZFwvZDd3Zmkwbi1hM2ZlNGQ5MC1hNGZkLTRkZTMtYTZjMS0wY2EyNTRjNDI0ZDMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.G0HR1O7vsLLVHUTVLnBPHqtBGtj3gOI_jaVO7rL3WiM";
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }
    },
    error=> alert(error.error.message))
  }
  option6(){
    delete this.user.password;
    delete this.user.role;
    this.user.image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/432780e4-f104-4387-987f-8611d44dc1c4/d7ucn6q-1095debc-2214-42ef-82e0-23af7ae27f04.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQzMjc4MGU0LWYxMDQtNDM4Ny05ODdmLTg2MTFkNDRkYzFjNFwvZDd1Y242cS0xMDk1ZGViYy0yMjE0LTQyZWYtODJlMC0yM2FmN2FlMjdmMDQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.tGtAYl6Oj-P1xw9CgpwZ7wSW1uYk-WILcYQ4ihdUczU";
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }
    },
    error=> alert(error.error.message))
  }
  option7(){
    delete this.user.password;
    delete this.user.role;
    this.user.image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/432780e4-f104-4387-987f-8611d44dc1c4/d7x2ibh-0cbfd966-52c1-41e4-a0a4-dd59253c0813.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQzMjc4MGU0LWYxMDQtNDM4Ny05ODdmLTg2MTFkNDRkYzFjNFwvZDd4MmliaC0wY2JmZDk2Ni01MmMxLTQxZTQtYTBhNC1kZDU5MjUzYzA4MTMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BpPbWI1aIa3uAIPUyJIBUDXb2PK98ce4oWbTFYjK77Y";
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }
    },
    error=> alert(error.error.message))
  }
  option8(){
    delete this.user.password;
    delete this.user.role;
    this.user.image="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/432780e4-f104-4387-987f-8611d44dc1c4/d96sgi8-b22d19e2-7ed5-4b9a-936a-c113735524bf.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQzMjc4MGU0LWYxMDQtNDM4Ny05ODdmLTg2MTFkNDRkYzFjNFwvZDk2c2dpOC1iMjJkMTllMi03ZWQ1LTRiOWEtOTM2YS1jMTEzNzM1NTI0YmYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.D59ho8BLiG9iyRoK3fYsFLzrEE026A3FEdx1uB8N2rQ";
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }
    },
    error=> alert(error.error.message))
  }

}
