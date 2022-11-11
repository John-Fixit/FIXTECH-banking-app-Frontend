
import { Component, Input, OnInit } from '@angular/core';
import { navData } from './nav-data';
// import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],

})
export class SidenavComponent implements OnInit {
  // public faFim = faFilm
  public navData = navData
  @Input() sideNavStatus:boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }

}
