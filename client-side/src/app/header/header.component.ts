import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersService } from '../services/users.service';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false
  public userId:any = ""
  public avatar:any = ""
  icons = { faBars, faTimes }
  constructor(
    public userService : UsersService
  ) { }

  ngOnInit(): void {
    this.userService.authorizeUser().subscribe((res)=>{
      this.avatar = res.userDetail.profile_picture
    })
   
    
  }

  sideNavToggle(){
    this.menuStatus = !this.menuStatus
    this.sideNavToggled.emit(this.menuStatus)
  }

}
