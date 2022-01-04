import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomEncryptionDecryptionService } from 'src/app/utils/custom-encryption-decryption.service';

@Component({
  selector: 'app-super-admins-layout',
  templateUrl: './super-admins-layout.component.html',
  styleUrls: ['./super-admins-layout.component.scss'],
})
export class SuperAdminsLayoutComponent implements OnInit {

  linkItems: any = [];
  navItems: any[] = [
    {
      path: '/widgets',
      title: 'Widgets',
      icontype: 'ni-single-02',
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
    private  customEncryptionDecryptionService:  CustomEncryptionDecryptionService,
  ) {
    const role = customEncryptionDecryptionService.decrypt(localStorage.getItem('role') || '');

    translate.get('menus.super-admin').subscribe(menus => {
      this.linkItems = [
        /*DONNÉES*/
        {
          module: menus['datas'],
          isFirst: true,
        },
      ];
    });
  }

  ngOnInit(): void {
  }
}
