import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrl: 'tabs.page.scss' 
})
export class TabsPage {

  onContentScroll(event: any) {
    console.log('scroll')
    const tabBar = document.querySelector('iontabbar');
    if (event.detail.scrollTop > 50) {
      tabBar?.classList.add('ion-hide-tab-bar');
    } else {
      tabBar?.classList.remove('ion-hide-tab-bar');
    }
  }
  
}
