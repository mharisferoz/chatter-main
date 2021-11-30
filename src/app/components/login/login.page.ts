import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BaseService } from 'src/app/services/Base.Service';
import { GeneralService } from 'src/app/services/general.service';
import { globalConfig } from 'src/app/services/global.config';
import { HttpConfigService } from 'src/app/services/http-config.service';
import { UserService } from 'src/app/services/user.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  msg: any;
  email = 'mharisferoz@gmail.com';//abdulrafay@gmail.com
  password = 'm6zfbtfk';//1234567
  signUp: Form;
  data: any = {};
  isLoading = false;
  pisci: any;
  isRemember = false;
  currentDisplayDepartment: number = null;

  constructor(
    public router: Router,
    // public modalController: ModalController, public service: HttpConfigService, public auth: UserService,
    public modalController: ModalController, public service: HttpConfigService,
    public generalService: GeneralService
  ) {
    this.generalService.setCustomer('');
    this.generalService.setUserLogin('');
    this.generalService.setActuallUserLogin('');
    this.generalService.clear();
    // this.auth.clear();
  }

  pisca() {
    this.router.navigate(['/folder/inbox']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  home() {
    // this.router.navigate(['/folder/inbox']);
    this.router.navigate(['/tabs']);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ForgotpasswordComponent,
      cssClass: 'my-custom-class',
      backdropDismiss: true,
      mode: 'ios',
      showBackdrop: true,
    });
    return await modal.present();
  }

  async login() {
    // this.isLoading = false;
    // this.service.LoginObj.username = this.username;
    // this.service.LoginObj.password = this.password;
    // this.data.username = this.email;
    // this.data.password = this.password;

    // this.service.obj.username = this.username;
    // this.service.obj.username = this.password;
    // let loginRes = await this.service.getListItems(this.data);
    // if (loginRes.isSuccessful ) {
    //   this.isLoading = false;
    //   this.data = loginRes.Data;
    //   this.router.navigate(['/tabs']);
    // }
    // else {
    //   this.isLoading = false;
    //   this.service.generalErrorMessage(this.service.errors);
    // }
  }

  async getLogin() {
    this.data.email = this.email;
    this.data.password = this.password;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi('users/login', this.data);
    if (data1.status && data1.data) {
      this.service.settoken(data1.data.token);
      this.service.setuser(data1.data);
      this.data = data1;
      this.generalService.generalToast('Logged In SuccessFully', 2000);
      this.router.navigate(['/tabs']);
    }
    else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader();
    // this.email = data1.email;
    // this.password = data1.password;
  }

  isAuthorize() {
    // const msg = 'email';
    // const msg1 = 'password';
    // if (!this.email || this.email === '') {
    //   this.service.presentToast(msg);
    // };
    // if (!this.password || this.password === '') {
    //   this.service.presentToast(msg1);
    // };
    // return true;

    // const errors = [];
    // let msg = '';
    if (!this.email) {
      this.msg = 'Email is required';
      this.service.presentToast(this.msg);
      // this.service.presentToast(msg);
    }
    if (!this.password) {
      this.msg = 'Password is required';
      this.service.presentToast(this.msg);
      // this.service.presentToast(msg1);
    }
    return this.msg.length === 0;
  }

  async initializeDepartmentList() {

    // let result
    // await this.service.presentLoading(async () => {
    //   result = this.service.getListItems(this.data);
    // });

    // if (result.isSuccessful) {
    //   this.data = result.data;
    //   return true;
    // } else {
    //   return result.errors;
    // }

    // if (this.isAuthorize()) {
    //   this.isLoading = true;
    //   this.data.email = this.email;
    //   this.data.password = this.password;

    //    (await this.service.getListItems(this.data)).subscribe(
    //     async (data: DepartmentModel[]) => {
    //       this.pisci = data;
    //       const values = Object.keys(data).map(key => data[key]);
    //       const commaJoinedValues = values.join(',');
    //     }
    //   );
    //   this.isLoading = false;
    // }

  }

  // async initializeDepartmentListt(): Promise<void> {
  //   // if (this.isAuthorize()) {
  //     this.data.username = this.email;
  //   this.data.password = this.password;
  //     const data = (await this.service.getListItems(this.data)).toPromise();
  //     this.pisci = data;
  //     this.router.navigate(['/tabs']);
  //   // }
  // }

  // async loginA() {
  //   this.isLoading = true;
  //   const loginRes = await this.auth.login(
  //     this.email,
  //     this.password,
  //   );
  //   if (loginRes.isSuccessful) {
  //     this.isLoading = false;
  //     localStorage.setItem('token', ('bearer' + (loginRes).data.token));
  //     localStorage.setItem('user', JSON.stringify((loginRes).data));
  //     BaseService.fill('bearer' + (loginRes).data.token);
  //     this.saveForm();
  //     this.generalService.setActuallUserLogin((loginRes).data.loginObject.userLogin);
  //     this.setACustomer(loginRes.data);
  //   }
  //   else {
  //     this.isLoading = false;
  //     this.generalService.generalErrorMessage(loginRes.errors);
  //   }

  // }

  saveForm() {
    if (this.isRemember === true) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
    }
    else {
      localStorage.setItem('email', '');
      localStorage.setItem('password', '');
    }
  }

  setACustomer(data) {
    if (data.loginObject) {
      this.generalService.setUserLogin(data.loginObject.userLogin);
      this.generalService.setActuallUserLogin(data.loginObject.userLogin);
      this.generalService.setRole(data.loginObject.genRolesId);
      if (data.loginObject.customer != null && data.loginObject.customer !== undefined) {
        this.generalService.setCustomer(data.loginObject.customer.shortName);
      }
    }

  }


  ngOnInit() { }
}
