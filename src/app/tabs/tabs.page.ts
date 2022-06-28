import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public home:boolean;
  public homeName:any = 'home';
  public winName:any = 'trophy-outline';
  public profileName:any = 'person-outline';
  constructor() {}

  homeTab() {
    this.homeName = 'home';
    this.winName = 'trophy-outline';
    this.profileName = 'person-outline';
  }
  winTab() {
    this.homeName = 'home-outline';
    this.winName = 'trophy';
    this.profileName = 'person-outline';
  }
  profileTab() {
    this.homeName = 'home-outline';
    this.winName = 'trophy-outline';
    this.profileName = 'person';
  }
}
