import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { settingData } from './settingData';
import { UsersService } from '../services/users.service';
import { faGreaterThan as greaterSign, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { async } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  sideNavStatus : boolean = false
  thisData: any = settingData;
  public userDetail: any = undefined
  public profile_file: any = undefined
  public baseUrl = environment.url
  greaterSign = greaterSign
  pencil = faPencilAlt
  constructor(
    public userService : UsersService,
    public http : HttpClient,
  ) { }

  ngOnInit(): void {
    this.userService.authorizeUser().subscribe(res=>{
      this.userDetail = res.userDetail
    })
    this.userDetail = JSON.parse(localStorage['userDetail'])

  }

  selectFile(params: any){
    let thisSelectedFile = params.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(thisSelectedFile)
   reader.onload= ()=>{
       this.http.post(`${this.baseUrl}/uploadUserPicture`, {fileUrl: reader.result, id: this.userDetail._id}).subscribe((res)=>{
        console.log(res);
       })
   
      
   }
  }

  modalOutEdit(params: any){
    console.log(params.text);
  }

}
