import { Component, Input } from '@angular/core';
interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FINTECH';
  @Input() collapsed = false
  @Input() screenWidth = 0;
  getBodyClass(): string{
    let styleClass = "";
    if(this.collapsed && this.screenWidth >768){
      styleClass = "body-trimmed"
    }
    else if(this.collapsed && this.screenWidth <=768 && this.screenWidth > 0){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
  isCollapsed = false;
  // screenWidth = 0;
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth
    this.isCollapsed = data.collapsed
  }

}
