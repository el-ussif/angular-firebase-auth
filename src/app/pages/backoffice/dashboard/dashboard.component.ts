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
  loading: boolean = false;
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
  token: string | null = '';


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
    this.token = localStorage.getItem('userAccessToken')
    this.getStats();
  }

  getStats() {

  }
}
