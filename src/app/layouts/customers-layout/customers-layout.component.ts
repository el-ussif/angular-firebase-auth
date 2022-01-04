import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AclService } from 'src/app/utils/acl.service';

@Component({
  selector: 'app-customers-layout',
  templateUrl: './customers-layout.component.html',
  styleUrls: ['./customers-layout.component.scss'],
})
export class CustomersLayoutComponent implements OnInit {
  linkItems: any = [];

  navItems: any[] = [
    {
      path: '/dashboards/customers-dashboard/customers-dashboard/widgets',
      title: 'Widgets',
      icontype: 'ni-archive-2',
      background: 'bg-gradient-red',

    },
    {
      path: '/email',
      title: 'Email',
      icontype: 'ni-email-83',
      background: 'bg-gradient-orange',
    },
  ];


  constructor(
    private translate: TranslateService,
    private aclService: AclService,
  ) {
    translate.get('menus.customer-admin').subscribe(menus => {
      this.linkItems = [
        /*PROVIDERS*/
        this.aclService.havePermission('READ_CUSTOMER') ? ({
          title: menus['provider-list'],
          type: 'link',
          path: '/dashboards/customers-dashboard/providers',
          icontype: 'ni-badge text-black',
        }) : undefined,
        /*INVOICES*/
        this.aclService.havePermission('READ_INVOICE') ? ({
          title: menus['invoice'],
          type: 'link',
          icontype: 'fa-file-invoice fa text-black',
          path: '/dashboards/customers-dashboard/invoices/monitoring',
        }) : undefined,
        /*LITIGES*/
        this.aclService.havePermission('READ_TICKET') ? ({
          title: menus['litigation'],
          type: 'link',
          icontype: 'ni-paper-diploma text-black',
          path: '/dashboards/customers-dashboard/litigations',
        }) : undefined,

        /*ADMINISTRATION*/
        this.aclService.havePermission('READ_USER') ? ({
          title: menus['admin-list'],
          type: 'link',
          path: '/dashboards/customers-dashboard/users',
          icontype: 'ni-briefcase-24 text-black',
        }) : undefined,
      ];
    });
  }

  ngOnInit(): void {
  }

}
