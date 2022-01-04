import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';
import { MiscellaneousModule } from 'src/app/miscellaneous/miscellaneous.module';
import { PipesModule } from 'src/app/utils/pipes/pipes.module';
import { AuthorsModule } from './authors/authors.module';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { CollectionsModule } from './collections/collections.module';
import { ContractsModule } from './contracts/contracts.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibrariesModule } from './libraries/libraries.module';
import { TransactionsModule } from './transactions/transactions.module';
import { LanguagesModule } from './languages/languages.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
    imports: [
        CommonModule,
        BackofficeRoutingModule,
        AuthorsModule,
        LibrariesModule,
        CollectionsModule,
        TranslateModule,
        MiscellaneousModule,
        ContractsModule,
        TransactionsModule,
        LanguagesModule,
        CategoriesModule,
        TagsModule,
        PipesModule,
        ChartsModule,
        UsersModule,
    ],
})
export class BackofficeModule { }
