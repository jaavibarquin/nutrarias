import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CitasOnlineService
{ 
  path: string;
  obvs: Observable<any> ;
  constructor(private httpclient: HttpClient) { }


  getCitasDia(d: Date | null): Observable<any> {
    this.path = `https://nutrarias.es/citas-online/buscar-citas/`;
    this.path.concat(d.toISOString().slice(0, 10));
    
    try {
      this.obvs = this.httpclient.get(this.path);
      return this.obvs;
}
    catch (error) {
      window.alert(error);
      window.alert('Javi: ' + error.message);
    }
    return null;
  }
}