import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';
import { ServerBridgeService } from 'src/app/utils/http/server-bridge.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  statistics: any = {};
  role: string = '';

  RBarChartLabels: any[] = [];
  RBarChartData: any[] = [];
  yearBarChartLabels: any[] = [];
  yearBarChartData: any[] = [];
  ABarChartLabels: any[] = [];
  ABarChartData: any[] = [];
  barChartType: any = 'line';
  months: any = {};
  barChartLegend: boolean = false;
  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };


  constructor(
    protected serverBridgeService: ServerBridgeService,
    private  customEncryptionDecryptionService:  CustomEncryptionDecryptionService,
    private translate: TranslateService) {
    this.translate.get('months').subscribe(response => {
      this.months = response;
    });
    this.role = customEncryptionDecryptionService.decrypt(localStorage.getItem('role') || '');
  }

  ngOnInit(): void {
    this.getStats();
    this.listenedFrequencyStats();
  }

  getStats() {
    this.loading = true;
    this.serverBridgeService.loadResource('/users/statistics', false).subscribe(response => {
      if (response) {
        this.statistics = response;
      }
      this.loading = false;
    });
  }

  listenedFrequencyStats() {
    this.loading = true;
    this.serverBridgeService.loadResource('/users/listened-frequencies', false).subscribe(response => {
      if (response && response.perMonths) {
        const datas = [];
        for (let i = 1; i < 13; i++) {
          let data = 0;
          response.perMonths.forEach((item: any) => {
            if (item.monthid == i) {
              data = item.count
            }
          });
          datas.push(data);
          this.ABarChartLabels.push(this.months[i]);
        }
        this.ABarChartData = [
          {
            data: datas,
            pointRadius: 0,
            fill: false,
          }
        ]
      }

      if (response && response.perYears) {
        const datas = [];
        const currentYears = new Date().getFullYear();
        for (let i = (currentYears-10); i < (currentYears+2); i++) {
          let data = 0;
          response.perYears.forEach((item: any) => {
            if (item.yearid == i) {
              data = item.count
            }
          });
          datas.push(data);
          this.yearBarChartLabels.push(i);
        }
        this.yearBarChartData = [
          {
            data: datas,
            pointRadius: 0,
            fill: false,
          }
        ]
      }
      this.loading = false;
    });

  }
}
