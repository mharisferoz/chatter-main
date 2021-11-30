import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { LoginPage } from './components/login/login.page';
import { GeneralService } from './services/general.service';
import { globalConfig } from './services/global.config';
import { HttpConfigService } from './services/http-config.service';
import { TabsPage } from './tabs/tabs.page';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  rootPage: any = LoginPage;
  public appPages = [
    { title: 'Home', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Create Post', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Video', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Chat', url: '/folder/Archived', icon: 'archive' },
    { title: 'Profile', url: '/folder/Trash', icon: 'trash' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public router: Router, public menu: MenuController, public nav: NavController, private injector: Injector,
    public platform: Platform, public service: HttpConfigService, public generalService: GeneralService,) {
    globalConfig.injector = injector;
    this.initializeApp();
    const token = localStorage.getItem('token');
    if (token && token.indexOf('bearer ') > -1) {
      this.rootPage = TabsPage;
    }
  }

  home() {
    // this.router.navigate(['/tabs']);
    this.nav.navigateRoot('/tabs');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  chat() {
    // this.router.navigate(['/tabs/chat']);
    this.nav.navigateRoot('/tabs/chat');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  profile() {
    // this.router.navigate(['/tabs/profile']);
    this.nav.navigateRoot('/tabs/profile');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  verifyid() {
    // this.router.navigate(['/tabs/profile']);
    this.nav.navigateRoot('/verify-id');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  connections() {
    // this.router.navigate(['/tabs/profile']);
    this.nav.navigateRoot('/followers');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  createvideo() {
    // this.router.navigate(['/tabs/profile']);
    this.nav.navigateRoot('/tabs/video');
    setTimeout(() => {
      this.menu.close();
    }, 100);
  }

  async logout() {
    const url = 'users/logoutAll';
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      // this.videos = data1.data;
      this.service.setVideo(data1.data);
      this.nav.navigateRoot('/login');
      setTimeout(() => {
        this.menu.close();
      }, 100);
      this.generalService.generalToast(data1.msg, 2000);
    }
    else {
      if (data1.status === false) {
        this.generalService.generalToast(data1.msg, 2000);
      }
      // this.generalService.generalToast(data1.msg);
      // console.log(data1.msg);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

}
