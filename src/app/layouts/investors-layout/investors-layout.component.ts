import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investors-layout',
  templateUrl: './investors-layout.component.html',
  styleUrls: ['./investors-layout.component.scss']
})
export class InvestorsLayoutComponent implements OnInit {

  linkItems: any = [
    {
      path: "/dashboards",
      title: "Investors",
      type: "sub",
      icontype: "ni-shop text-primary",
      isCollapsed: true,
      children: [
        { path: "test", title: "Dashboard", type: "link" },
        { path: "alternative", title: "Alternative", type: "link" }
      ]
    },
    {
      path: "/widgets",
      title: "Widgets",
      type: "link",
      icontype: "ni-archive-2 text-green"
    },
  ];
  navItems: any[] = [
    {
      path: "/widgets",
      title: "Widgets",
      icontype: "ni-archive-2",
      background: "bg-gradient-red",

    },
    {
      path: "/email",
      title: "Email",
      icontype: "ni-email-83",
      background: "bg-gradient-orange",
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
