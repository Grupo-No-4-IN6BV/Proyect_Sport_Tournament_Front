import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { fadeIn } from 'src/app/animations/animations';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css'],
  animations: [fadeIn]
})
export class AdministrationComponent implements OnInit {

  @Input() inputSideNav: MatSidenav;
  
  value = '';
  public edit:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.edit = false;
    console.log('hola')
  }
  ngOnChanges(){
    this.edit = false;
  }


  
  editarbtn(){
    this.edit=true;
  }
  canceledit(){
    this.edit=false;
  }

}
