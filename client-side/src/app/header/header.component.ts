import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from '../services/users.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false
  public userId:any = ""
  barIcon = faBars
  constructor(
    public userService : UsersService
  ) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage['userDetail'])._id
    // this.userService.getUser().subscribe(res=>{
    //    this.userId = res._id
    // })
  }

  sideNavToggle(){
    this.menuStatus = !this.menuStatus
    this.sideNavToggled.emit(this.menuStatus)
  }

}
