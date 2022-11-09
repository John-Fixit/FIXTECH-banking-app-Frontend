
import { Component, Input, OnInit } from '@angular/core';
import { navData } from './nav-data';
interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],

})
export class SidenavComponent implements OnInit {

  public navData = navData
  @Input() sideNavStatus:boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }

}
