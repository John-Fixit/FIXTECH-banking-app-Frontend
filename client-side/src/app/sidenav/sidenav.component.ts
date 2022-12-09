
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

  // public id: any = JSON.parse(localStorage['userDetail'])['_id'];
  public id: any = '00000000';

//   public navData:any = [
//     {
//         route: "/home/",
//         name: "Dashboard",
//         icon: faHome
//     },
//     {
//         route: "/home/transfer",
//         name: "Transfer",
//         icon: faExchange
//     },
//     {
//         route: "/home/add_money",
//         name: "Add Money",
//         icon: faMoneyCheckAlt
//     },
//     {
//         route: "/home/transaction_history",
//         name: "Transaction History",
//         icon: faHistory
//     },
//     {
//         route: `/home/profile/${this.id}`,
//         name: "Profile",
//         icon: faUserAlt
//     },
//     {
//         route: "/home/setting",
//         name: "Setting",
//         icon: faGear
//     },
// ]
  constructor(
    public userService : UsersService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userService.authorizeUser().subscribe((res)=>{
      console.log(res);
      this.id =  res.userDetail._id
    })
    if(localStorage['userDetail']){
      this.id = JSON.parse(localStorage['userDetail'])._id
    }

  }

  logOut(){
      if(confirm('are you sure to log out')){
        localStorage.removeItem('userToken')
        this.router.navigate(['/login']);
      }
  }
  // getId(){
  //   this.userService.authorizeUser().subscribe((res)=>{
  //     console.log(res.userDetail);
  //     return res.userDetail._id
  //   })
  // }
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
