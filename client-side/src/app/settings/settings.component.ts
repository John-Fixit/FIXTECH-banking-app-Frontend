import { Component, OnInit } from '@angular/core';
import { settingData } from './settingData';
import { UsersService } from '../services/users.service';
import { faGreaterThan as greaterSign, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EditProfileService } from '../services/edit-profile.service';
import { ToastService } from 'angular-toastify';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  sideNavStatus : boolean = false
  thisData: any = settingData;
  public userDetail: any = undefined
  public baseUrl = environment.url
  public currentInfoToEdit = ""
  greaterSign = greaterSign
  pencil = faPencilAlt

  public firstname = ""
  public lastname = ""
  public email = ""
  public phoneNumber = ""
  public address = ""

  public resMessage = ""
  public resStatus:any = undefined
  public isLoading = false
  public ppIsLoading = false
  constructor(
    private userService : UsersService,
    private _http : HttpClient,
    private editService: EditProfileService,
    private _toastService: ToastService,
    
  ) { }

  ngOnInit(): void {
    if(localStorage['userDetail']){
    this.userDetail = JSON.parse(localStorage['userDetail'])
    }
    this.userService.authorizeUser().subscribe((res)=>{
      this.userDetail = res.userDetail
      this.firstname = res.userDetail.firstname
      this.lastname = res.userDetail.lastname
      this.email = res.userDetail.email
      this.phoneNumber = res.userDetail.phoneNumber
      this.address = res.userDetail.address
    })
  }

  selectFile(params: any){
    let thisSelectedFile = params.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(thisSelectedFile)
    reader.onload= ()=>{
        this.ppIsLoading = true
       this._http.post(`${this.baseUrl}/uploadUserPicture`, {fileUrl: reader.result, id: this.userDetail._id}).subscribe((res:any)=>{
        this.ppIsLoading = false
          console.log(res);
          if(res.status){
                this._toastService.success(res.message)
                window.location.reload()
          }
          else{
            this._toastService.error(res.message)
          }
       })
  
      
   }
  }
  modalOutEdit(params: any){
    this.currentInfoToEdit = params.text;
  }

  saveChanges(){
    let detailsToEdit;
    let userId = this.userDetail._id  
    if(this.currentInfoToEdit == "Change Name"){
        detailsToEdit = {type: 'name', firstname:this.firstname, lastname:this.lastname}
    }
    else if(this.currentInfoToEdit == "Change Email"){
        detailsToEdit = {type: 'email', email:this.email}
    }
    else if(this.currentInfoToEdit == "Change Number"){
        detailsToEdit = {type: 'phoneNumber', phoneNumber:this.phoneNumber}
    }
    else if(this.currentInfoToEdit == "Change Address"){
        detailsToEdit = {type: 'address', address:this.address}
    }
    this.isLoading = true
    this.editService.editProfile(userId, detailsToEdit).subscribe((res:any)=>{
      this.isLoading = false
      if(res.status){
        this._toastService.success(res.message)
      }
      else this._toastService.error(res.message)
    })

  }

}
