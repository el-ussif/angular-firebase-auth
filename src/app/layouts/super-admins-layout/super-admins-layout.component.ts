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
        (role === 'ADMIN') ? {
          module: menus['datas'],
          isFirst: true,
        } : undefined,
        (role === 'ADMIN') ? ({
          title: menus['languages'],
          type: 'link',
          path: '/languages',
          icontype: 'fa fa-language text-black',
        }) : undefined,
        (role === 'ADMIN') ? ({title: menus['categories'],
          type: 'link',
          path: '/categories',
          icontype: 'fa fa-layer-group text-black',}) : undefined,
        (role === 'ADMIN') ? ({title: menus['tags'],
          type: 'link',
          path: '/tags',
          icontype: 'fa fa-hashtag text-black',
        }) : undefined,
        /*DONNÉES*/
        (role === 'ADMIN' || role === 'DESIGNER' || role === 'AGENT') ? ({
          module: menus['applications'],
          isFirst: (role === 'DESIGNER' || role === 'AGENT'),
        }) : undefined,
        /*AUTHOR*/
        (role === 'ADMIN' || role === 'AGENT') ? ({
          title: menus['authors'],
          type: 'link',
          icontype: 'ni-single-02 text-black',
          path: '/authors',
        }) : undefined,
        (role === 'ADMIN' || role === 'DESIGNER' || role === 'AGENT') ? ({
          title: menus['collections'],
          type: 'link',
          icontype: 'ni-collection text-black',
          path: '/collections',
        }) : undefined,
        /*CONTES*/
        (role === 'ADMIN' || role === 'DESIGNER' || role === 'AGENT') ? ({
          title: menus['tailes'],
          type: 'link',
          icontype: 'fa fa-headphones-alt text-black',
          path: '/tailes',
        }) : undefined,
        /*
        * PARAMETRAGE
         */
        (role === 'ADMIN' || role === 'AGENT') ? ({
          module: menus['settings'],
        }) : undefined,

        /*GESTION DES UTILISATEURS*/
        (role === 'ADMIN') ? ({
          title: menus['admin-list'],
          type: 'link',
          path: '/users',
          icontype: 'ni-briefcase-24 text-black',
        }) : undefined,

        /*CONTRATS*/
        (role === 'ADMIN' || role === 'AGENT') ? ({
          title: menus['contracts'],
          type: 'link',
          icontype: 'fa fa-file-contract text-black',
          path: '/contracts',
        }) : undefined,

        /*TRANSACTION*/
        (role === 'ADMIN' || role === 'AGENT') ? ({
          title: menus['transactions'],
          type: 'link',
          icontype: 'fa fa-money-check-alt text-black',
          path: '/transactions'
        }) : undefined,
      ];
    });
  }

  ngOnInit(): void {
  }
}
