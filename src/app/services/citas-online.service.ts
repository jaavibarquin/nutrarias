import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AreaCita, CitaI } from '../shared/models/citas.interface';

@Injectable()
export class CitasOnlineService
{ 
  basePath: string | null;
  obvs: Observable<CitaI[]>;
  path: string | null;

  constructor(private httpclient: HttpClient) {
    this.basePath = `http://localhost:8080/nutrarias`;
  }


  public getCitasLibresDia(area: string | null, dia: string | null): Observable<CitaI[]> {
    this.path = this.basePath.concat(`/citas/${area}`);
    console.log(this.path);
    const options = dia? { params: new HttpParams().set('fecha', dia)
  } : { };
    if (area == "ENTR" || area == "PSIC" || area == "NUTR") {
      try {
        this.obvs = this.httpclient.get<CitaI[]>(this.path, options);
        // .pipe(
        //   catchError(this.handleError<CitaI[]>('getCitasLibresDia', []))
        // );
        return this.obvs;
      }
      catch (error) {
        window.alert(error);
        window.alert('Error: ' + error.message);
      }
      return null;
    } else {
      return null;
    }
  }

  public getCita(area: string, dia: string, hora: string): Observable<CitaI> {
    //this.path = this.basePath.concat(`/citas/${area}/${dia}/${hora}`);
    this.path = this.basePath.concat(`/citas/NUTR/2022-08-22/10:00:00`);
    return this.httpclient.get<CitaI>(this.path);
  }
}