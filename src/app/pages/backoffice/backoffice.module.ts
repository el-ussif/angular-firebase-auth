import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';
import { MiscellaneousModule } from 'src/app/miscellaneous/miscellaneous.module';
import { PipesModule } from 'src/app/utils/pipes/pipes.module';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
    imports: [
        CommonModule,
        BackofficeRoutingModule,
        TranslateModule,
        MiscellaneousModule,
        PipesModule,
        ChartsModule,
    ],
})
export class BackofficeModule { }
