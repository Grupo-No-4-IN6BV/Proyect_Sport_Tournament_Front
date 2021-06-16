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

  log1="https://uploads.gamedev.net/gallery/monthly_2019_12/86ad541ca8274f83a075d77612af647a.fight__upper_1soph.gif";
  log2="https://64.media.tumblr.com/a3e236c93c6c76f09a97bfa2f039dbbd/tumblr_mrfo0dyD4Q1rfjowdo1_500.gifv";
  log3="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/22a80201-77ea-4372-abfc-bdcdc927b3ff/d7w4nrb-07a49d96-7e83-4b9c-9963-ccd769251717.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIyYTgwMjAxLTc3ZWEtNDM3Mi1hYmZjLWJkY2RjOTI3YjNmZlwvZDd3NG5yYi0wN2E0OWQ5Ni03ZTgzLTRiOWMtOTk2My1jY2Q3NjkyNTE3MTcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vgDdilWyJ4h1xP2XV9duv2_V7KtL2WR8eyMod9DoIqs";
  log4="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/b42ac6fb-ea5d-4fe2-bf4f-87654bb29d8d/d899rg8-f2d2a996-e62f-4e44-beeb-1c7c1400fe7a.gif";


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
