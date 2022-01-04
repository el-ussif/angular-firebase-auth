import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AclService } from 'src/app/utils/acl.service';

@Component({
  selector: 'app-providers-layout',
  templateUrl: './providers-layout.component.html',
  styleUrls: ['./providers-layout.component.scss']
})
export class ProvidersLayoutComponent implements OnInit {

  linkItems: any[] = [];

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

  constructor(
    private translate: TranslateService,
    private aclService: AclService,
  ) {
    translate.get('menus.provider-admin').subscribe(menus => {
      this.linkItems =  [
        this.aclService.havePermission('READ_INVOICE') ? ({
          title: menus['invoice-list'],
          type: 'link',
          path: '/dashboards/providers-dashboard/invoices',
          icontype: 'ni-badge text-black',
        }) : undefined,
        this.aclService.havePermission('READ_TICKET') ? ({
          title: menus['litigation'],
          type: 'link',
          icontype: 'ni-paper-diploma text-black',
          path: '/dashboards/providers-dashboard/litigations',
        }) : undefined,
        this.aclService.havePermission('READ_USER') ? ({
          title: menus['admin-list'],
          type: 'link',
          path: '/dashboards/providers-dashboard/users',
          icontype: 'ni-briefcase-24 text-black',
        }) : undefined,
      ];
    });
  }

  ngOnInit(): void {
  }

}
