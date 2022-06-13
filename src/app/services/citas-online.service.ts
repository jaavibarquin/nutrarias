import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { CitaI } from '../shared/models/citas.interface';

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
    this.path = this.basePath.concat(`/citas/${area}/libres`);
    const options = dia? { params: new HttpParams().set('fecha', dia)
  } : { };
    if (area == "ENTR" || area == "PSIC" || area == "NUTR") {
      try {
        this.obvs = this.httpclient.get<CitaI[]>(this.path, options);
      }
      catch (error) {

        window.alert(error);
        window.alert('Error: ' + error.message);
        this.obvs = null;
      }
      return this.obvs;
    } else {
      return null;
    }
  }

  public getCita(area: string, dia: string, hora: string): Observable<CitaI> {
    this.path = this.basePath.concat(`/citas/${area}/${dia}/${hora}`);
    return this.httpclient.get<CitaI>(this.path);
  }

  putCita(cita: CitaI) : Observable<any> {
    if (cita != null) {
      this.path = this.basePath.concat(`/citas/${cita.area}/${cita.fecha}/${cita.hora}`);
      return this.httpclient.put(this.path, cita);
    }
    
  } 
}