import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpConfigService } from 'src/app/services/http-config.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username = '';
  fname = '';
  lname = '';
  mobile = '';
  email = 'abdulrafay@gmail.com';
  age = '';
  password = '1234567';
  bio = '';
  location = '';
  view: boolean;
  value: 'Posts';
  segment: any;
  profileData: any = [];
  profileDataForPatch: any = [];
  constructor(
    public generalService: GeneralService,
    private router: Router,
    public service: HttpConfigService
  ) {
    this.segment = 'Posts';
  }

  toggle() {
    if (this.view === true) {
      this.view = false;
    }
    // else {
    //   this.view = true;
    // }
  }

  // notifications() {
  //   this.router.navigate(['/notifications']);
  // }

  segmentChanged(ev: any) {
    this.value = 'Posts';
    this.value = ev.detail.value;
  }

  async getUsers() {
    // const url = 'users/me/' + param['_id'];
    this.generalService.showLoader();
    const url = 'users/me';
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.profileData = data1.data;
      this.username = this.profileData.username;
      this.fname = this.profileData.fname;
      this.lname = this.profileData.lname;
      this.mobile = this.profileData.mobile;
      this.email = this.profileData.email;
      this.age = this.profileData.age;
      this.bio = this.profileData.bio;
      this.location = this.profileData.location;
      this.generalService.stopLoader();
      // this.router.navigate(['/profileforusers', { data: JSON.stringify(data1.data[0]) }]);
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
  }

  async patchVideos() {
    this.profileDataForPatch.username = this.username;
    this.profileDataForPatch.fname = this.fname;
    this.profileDataForPatch.lname = this.lname;
    this.profileDataForPatch.mobile = this.mobile;
    this.profileDataForPatch.email = this.email;
    this.profileDataForPatch.age = this.age;
    this.profileDataForPatch.bio = this.bio;
    this.profileDataForPatch.location = this.location;

    this.generalService.showLoader();
    const url = 'users/me';
    debugger;
    const data1: any = await this.service.postApi(
      url,
      this.profileDataForPatch
    );
    if (data1.status && data1.data) {
      this.profileData = data1.data;
      this.generalService.stopLoader();
    } else {
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }

    // this.email = data1.email;
    // this.password = data1.password;
  }

  ngOnInit() {
    this.view = true;
    this.getUsers();
  }
}
