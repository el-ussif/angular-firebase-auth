import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-loader-spinner-component',
  templateUrl: './loader-spinner-component.component.html',
  styleUrls: ['./loader-spinner-component.component.scss']
})
export class LoaderSpinnerComponentComponent implements OnInit {
  @Input() message: any = ""
  constructor(private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinner.show();
  }
}
