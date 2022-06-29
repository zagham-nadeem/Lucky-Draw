import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss'],
})
export class WinnersComponent implements OnInit {

  public userList :any = [{name:'Jhon', time:'29-06-2022', img:'', status:1}];
  constructor() { }

  ngOnInit() {}

}
