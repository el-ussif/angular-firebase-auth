import { Pipe, PipeTransform } from '@angular/core';
import { AclService } from 'src/app/utils/acl.service';

@Pipe({
  name: 'accessControl'
})
export class AclPipe implements PipeTransform {
  constructor(
    private aclService: AclService,
  ) {
  }

  transform(name: any) {
    return this.aclService.havePermission(name);
  }
}
