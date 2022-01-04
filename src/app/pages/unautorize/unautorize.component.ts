import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unautorize',
  templateUrl: './unautorize.component.html',
  styleUrls: ['./unautorize.component.scss'],
})
export class UnautorizeComponent implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }
}
