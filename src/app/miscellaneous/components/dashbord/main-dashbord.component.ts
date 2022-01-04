import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-page-main-dashbord',
  templateUrl: './main-dashbord.component.html',
  styleUrls: ['./main-dashbord.component.scss']
})
export class MainDashbordComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() hasBody: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
