
import { Component, Input, OnInit } from '@angular/core';
import { navData } from './nav-data';
import { faHome, faGear, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],

})
export class SidenavComponent implements OnInit {

  icons = { faHome, faGear, faSignOutAlt }
  public navData = navData
  @Input() sideNavStatus:boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(navData);
    
  }

}
