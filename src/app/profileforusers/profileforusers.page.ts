import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { HttpConfigService } from '../services/http-config.service';

@Component({
  selector: 'app-profileforusers',
  templateUrl: './profileforusers.page.html',
  styleUrls: ['./profileforusers.page.scss'],
})
export class ProfileforusersPage implements OnInit {
  index: any;
  videoData: any = [];
  user: any = {};
  isconnectdata = false;
  isdisconnectdata = false;
  isreportdata = false;
  isunreportdata = false;
  constructor(
    public service: HttpConfigService,
    public generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async getVideos(param) {
    const url = 'users/details/' + param['_id'];
    this.generalService.showLoader();
    const data1: any = await this.service.getApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data;
      this.service.setVideo(data1.data);
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader;
  }

  async connect(param) {
    const url = 'users/connect/' + this.user.user._id;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data[0];
      this.setValues();
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader;
  }

  async disconnect(param) {
    const url = 'users/unconnect/' + this.user.user._id;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data[0];
      this.setValues();
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader;
  }

  async report(param) {
    const url = 'users/report/' + this.user.user._id;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data[0];
      this.setValues();
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader;
  }

  async unreport(param) {
    const url = 'users/unreport/' + this.user.user._id;
    this.generalService.showLoader();
    const data1: any = await this.service.postApi(url, {});
    if (data1.status && data1.data) {
      this.videoData = data1.data[0];
      this.setValues();
    } else {
      if (data1.status === false) {
        this.generalService.generalErrorMessage('No Record Found');
      }
      this.generalService.generalErrorMessage(data1.msg);
      console.log(data1.msg);
    }
    this.generalService.stopLoader;
  }
  setValues() {
    let disconnectcount = 0;
    let unreportcount = 0;
    this.videoData.connected.forEach((element) => {
      if (this.user.user._id == element.user_id) {
        disconnectcount++;
        this.isconnectdata = true;
      }
    });
    this.videoData.report.forEach((element) => {
      if (this.user.user._id == element.user_id) {
        unreportcount++;
        this.isreportdata = true;
      }
    });
    if (disconnectcount == 0) {
      this.isdisconnectdata = true;
    }
    if (this.videoData.connected.length == 0) {
      this.isdisconnectdata = false;
      this.isconnectdata = true;
    }
    if (unreportcount == 0) {
      this.isunreportdata = true;
    }
    if (this.videoData.report.length == 0) {
      this.isunreportdata = false;
      this.isreportdata = true;
    }
  }

  ngOnInit() {
    this.user = this.service.getuser();
    this.route.params.subscribe((params) => {
      this.videoData = JSON.parse(params.data);
      this.setValues();
      this.index = params.index;
    });
    // this.getVideos(this.videoData);
  }
}
