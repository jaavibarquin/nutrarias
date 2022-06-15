import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { CitaI } from '../shared/models/citas.interface';

@Injectable()
export class CitasOnlineService
{
  basePath: string | null;
  listaCitas: Observable<CitaI[]>;
  citaPut: Observable<any>;
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
        this.listaCitas = this.httpclient.get<CitaI[]>(this.path, options);
      }
      catch (error) {

        window.alert(error);
        window.alert('Error: ' + error.message);
        this.listaCitas = null;
      }
      return this.listaCitas;
    } else {
      return null;
    }
  }

  putCita(cita: CitaI) : Observable<CitaI> {
    if (cita != null) {
      // let body = JSON.stringify(cita);
      // console.log(body);
      this.path = this.basePath.concat(`/citas/${cita.area}/${cita.fecha}/${cita.hora}`);
      try {
        this.citaPut = this.httpclient.put<CitaI>(this.path, cita);
      }catch (error) {
        window.alert(error);
        window.alert('Error: ' + error.message);
        this.citaPut = null;
      }
      return this.citaPut;
    } else {
      return null;
    }
  } 

  public getCita(area: string, dia: string, hora: string): Observable<CitaI> {
    this.path = this.basePath.concat(`/citas/${area}/${dia}/${hora}`);
    return this.httpclient.get<CitaI>(this.path);
  }
}