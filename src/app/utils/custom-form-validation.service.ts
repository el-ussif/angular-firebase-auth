import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomFormValidationService {
  protected validations: any;

  constructor(private translateService: TranslateService) {
    const lang = translateService.getBrowserLang() || 'fr';
    this.translateService.getTranslation(lang).subscribe(response => {
      this.validations = response.validations;
    });
  }

  has(field: any) {
    return (field.errors !== null);
  }

  first(field: any) {
    if (field.touched) {
      const key = Object.keys(field.errors)[0];
      let { value } = field.errors[`${key}`];
      const { requiredLength } = field.errors[`${key}`];
      if (this.validations) {
        if (Array.isArray(value)) {
          return (this.validations[key]) ? this.validations[key].replace(':value1', value[0] || requiredLength)
            .replace(':value2', value[1] || requiredLength).replace(':field', field.name.toLowerCase())
            .replace(':value', field.name.toLowerCase()) : '';
        } else if (value || requiredLength || field.errors[`email`] || field.errors[`required`]) {
          return (this.validations[key]) ? this.validations[key].replace(':value', value || requiredLength)
            .replace(':field', field.name.toLowerCase()) : '';
        }
      }
    }
  }
}
