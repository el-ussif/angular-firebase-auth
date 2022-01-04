import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSpinnerModule} from 'ngx-spinner';
import { MainDashbordComponent } from 'src/app/miscellaneous/components/dashbord/main-dashbord.component';
import { LoaderSpinnerComponentComponent } from './components/loader-spinner-component/loader-spinner-component.component';
import { CustomLoaderComponent } from './components/custom-loader/custom-loader.component';



@NgModule({
  declarations: [
    LoaderSpinnerComponentComponent,
    MainDashbordComponent,
    CustomLoaderComponent,
  ],
  exports: [
    LoaderSpinnerComponentComponent,
    MainDashbordComponent,
    CustomLoaderComponent,
    CustomLoaderComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    TranslateModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MiscellaneousModule { }
