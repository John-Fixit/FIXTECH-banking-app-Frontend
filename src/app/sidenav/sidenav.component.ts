import { Component, Input, OnInit } from '@angular/core';
import { faHome, faGear, faSignOutAlt, faMoneyCheckAlt, faUserAlt, faExchange, faHistory } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],

})
export class SidenavComponent implements OnInit {

  logout = faSignOutAlt 
  @Input() sideNavStatus:boolean = false;

  constructor(
    public userService : UsersService,
    public router: Router
  ) { }

  ngOnInit(): void {
    
  }

  logOut(){
      if(confirm('are you sure to log out')){
        localStorage.removeItem('userToken')
        localStorage.removeItem('userDetail')
        this.router.navigate(['/login']);
      }
  }

  public navData:any = [
    {
        route: "/home/dashboard",
        name: "Dashboard",
        icon: faHome
    },
    {
        route: "/home/transfer",
        name: "Transfer",
        icon: faExchange
    },
    {
        route: "/home/add_money",
        name: "Add Money",
        icon: faMoneyCheckAlt
    },
    {
        route: "/home/add_money",
        name: "Payment",
        icon: faMoneyCheckAlt
    },
    {
        route: "/home/transaction_history",
        name: "History",
        icon: faHistory
    },
    {
        route: `/home/profile/${localStorage['userDetail']?(JSON.parse(localStorage['userDetail'])._id):"not found"}`,
        name: "Profile",
        icon: faUserAlt
    },
    {
        route: "/home/setting",
        name: "Setting",
        icon: faGear
    },

]

}
