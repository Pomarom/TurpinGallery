import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { NgModel, DefaultValueAccessor, NgControl } from '@angular/forms';


@Injectable()
export class HttpService {
    private turpin;
  constructor (
    private http: Http
  ) {
  }

  getTurpin(file, listIds) {
      const formData = new FormData();
    formData.append('input_image', file);
    formData.append('style', listIds[Math.floor(Math.random() * listIds.length)]);
    const headers = new Headers({});
    let options = new RequestOptions({ headers });
    let url = 'http://turbo.deepart.io/api/post/';

    return this.http.post(url, formData, options)
    .map((res: Response) => res);
  }

  getStyles(){
      let urlStyles = 'http://turbo.deepart.io/styles/';
    return this.http.get(urlStyles)
    .map((res: Response) => res);
  }

  getTurpinImg(url){
    return this.http.get(url).map((res: Response) => res);
  }

}