import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerBridgeService {
  endpoint: string = environment.endpoint;
  server_host: string = environment.server_host;
  headers: any;

  constructor(
    protected http: HttpClient,
  ) {
    this.headers = new HttpHeaders();
  }

  public loadResource(uri: string, paginator: boolean,
                      page: number | string = 1, query: string = '', per_page: number = 15): Observable<any> {
    const pager: string = paginator ? '1' : '0';
    const paginator_query = (paginator) ? '&page=' + page + '&perpage=' + per_page : '';
    this.refreshHeader();
    return this.http.get(this.endpoint + uri + '?topaginate=' + pager + paginator_query + query,
      {headers: this.headers});
  }

  public storeResource(uri: string, data: any, isJson = true, query: string = ''): Observable<any> {
    this.refreshHeader();
    isJson ? this.setHttpHeader('Content-Type', 'application/json') : null;
    return this.http
      .post(this.endpoint + uri + query, isJson ? JSON.stringify(data) : data, {headers: this.headers});
  }

  public deleteResource(uri: string, id: string | number, query: string = ''): Observable<any> {
    this.refreshHeader();
    return this.http.delete(this.endpoint + uri + id + query, {headers: this.headers});
  }

  public getResource(uri: string, id: string | number | null, query: string = ''): Observable<any> {
    this.refreshHeader();
    return this.http.get(this.endpoint + uri + id + query, {headers: this.headers});
  }

  public updateResource(uri: string, data: any, id: any = undefined, isJson = true, query: string = ''): Observable<any> {
    this.refreshHeader();
    isJson ? this.setHttpHeader('Content-Type', 'application/json') : null;
    return this.http
      .put(this.endpoint + uri + (data.id ? data.id : id) + query, isJson ? JSON.stringify(data) : data, {headers: this.headers});
  }

  private refreshHeader() {
    this.headers = new HttpHeaders();
    this.setHttpHeader('Accept', 'application/json');
    this.setHttpHeader('Authorization', 'Bearer ' + localStorage.getItem('userAccessToken'));
  }

  public setHttpHeader(name: string, value: string) {
    this.headers = this.headers.set(name, value.toString());
  }
}
