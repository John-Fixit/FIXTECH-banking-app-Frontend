import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkUser'
})
export class CheckUserPipe implements PipeTransform {

  transform(allUsers: any, search: any): any {
    if(search){
      search = search.toLowerCase();
      let filteredUser = allUsers.filter((item:any)=> item.accountNumber.toLowerCase().includes(search))
      if(filteredUser.length){
        return filteredUser;
      }
      else{
        return [{firstname:"No user", lastname: "of this account", accountNumber: 'not found'}]
      }
    }
  }

}
