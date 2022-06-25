import { AfterViewInit, Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/services/auth.service';
import { CitasOnlineService } from '../../services/citas-online.service';
import { TokenService } from '../../services/tokenService.service';


import { CitaI } from 'src/app/shared/models/citas.interface';
import { JWTTokenI } from 'src/app/shared/models/jwtToken.interface';
import { UserI } from 'src/app/shared/models/user.interface';



interface AreaCita {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-citas',
  templateUrl: './admin-citas.component.html',
  styleUrls: ['./admin-citas.component.css']
})

export class AdminCitasComponent implements OnInit, AfterViewInit {
  userEmail: string | null;
  userUid: string | null;
  token: JWTTokenI | null;
  isToken = false;
  public user$: Observable<UserI> = this.authSvc.afAuth.user;;
  public usuario: UserI | null;
  areaSeleccionada: string;
  dateSelected: Date | null;
  fechaHoy: Date | null;
  fechaManana: Date | null;
  fechaAyer: Date | null;
  previousDateSelected: Date | null;
  fechaSeleccionada: string | null;
  fechaNormalizada: string | null;
  listaCitas: CitaI[];

  format: string = 'dd/MM/yyyy HH:mma';
  displayedColumns: string[] = [
    'fechaCita',
    'nombreCita',
    'apellidosCita',
    'telefonoCita',
    'emailCita',
    'acciones'
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  areas: AreaCita[] = [
    { value: 'NUTR', viewValue: 'ÁREA NUTRICIÓN' },
    { value: 'ENTR', viewValue: 'ÁREA ENTRENAMIENTO' },
    { value: 'PSIC', viewValue: 'ÁREA PSICOLOGÍA' },
    { value: '', viewValue: 'TODAS' },
  ];
  constructor(@Inject(LOCALE_ID) private locale: string, private authSvc: AuthService, private tokenSvc: TokenService, private citasSvc: CitasOnlineService) {

  }

  ngOnInit(): void {
    this.user$ = this.authSvc.afAuth.user;
    this.getUsuarioActivo();
    this.listaCitas = [];
    this.fechaHoy = new Date();
    this.fechaManana = new Date(this.fechaHoy.getFullYear(), this.fechaHoy.getMonth(), this.fechaHoy.getDate() + 1);
    this.fechaAyer = new Date(this.fechaHoy.getFullYear(), this.fechaHoy.getMonth(), this.fechaHoy.getDate() - 1);
    this.areaSeleccionada = "NUTR";

  }
  ngAfterViewInit(): void {


  }
  ngDoCheck(): void {
    if (this.previousDateSelected != this.dateSelected) {
      this.previousDateSelected = this.dateSelected;
      this.fechaSeleccionada = formatDate(this.dateSelected, "yyyy-MM-dd", this.locale);
      this.onGetListaCitas(this.fechaSeleccionada);
      this.fechaNormalizada = formatDate(this.dateSelected, "dd-MM-yyyy", this.locale);
      this.dataSource.paginator = this.paginator;
    }

  }

  public onBuscaTodasCitas(): void {
    this.fechaNormalizada = "TODAS";
    this.onGetListaCitas("");
  }
  public onBuscaCitasHoy(): void {
    const fechaString = formatDate(this.fechaHoy, "yyyy-MM-dd", this.locale);
    this.fechaNormalizada = this.normalizaFecha(this.fechaHoy);
    this.onGetListaCitas(fechaString);
  }

  public onBuscaCitasAyer(): void {
    const fechaString = formatDate(this.fechaAyer, "yyyy-MM-dd", this.locale);
    this.fechaNormalizada = this.normalizaFecha(this.fechaAyer);
    this.onGetListaCitas(fechaString);
  }
  public onBuscaCitasManana(): void {
    const fechaString = formatDate(this.fechaManana, "yyyy-MM-dd", this.locale);
    this.fechaNormalizada = this.normalizaFecha(this.fechaManana);
    this.onGetListaCitas(fechaString);
  }
  private onGetListaCitas(dia: string): void {
    if (!this.tokenSvc.getToken()) {
      this.obtenToken();
      console.log("no habia token", this.token);
    }
    this.citasSvc.getCitasDia(this.tokenSvc.getToken(), this.areaSeleccionada, dia).subscribe(
      datosCitas => {
        this.listaCitas = datosCitas;
        this.dataSource.data = datosCitas;
        this.dataSource.paginator = this.paginator;
      });


  }

  private getUsuarioActivo() {
    this.user$.subscribe(
      data => {
        this.usuario = data;
        this.userEmail = this.usuario.email;
        this.userUid = this.usuario.uid;
        this.obtenToken();
        this.onGetListaCitas("");
      }
    );
  }
  private obtenToken(): string {
    if (this.userEmail && this.userUid) {
      this.tokenSvc.obtenToken(this.userEmail, this.userUid)
        .subscribe(
          dataToken => {
            this.token = dataToken;
            this.tokenSvc.setToken(dataToken.token);
            this.tokenSvc.setEmail(dataToken.email);
            this.isToken = true;
            return dataToken.token;
          }, err => {
            this.isToken = false;
            console.log(err.message);
            console.log("getTokenObtenTokenERR: ", this.tokenSvc.getToken());
            return "noTokenFaill";
          }
        )
    }
    else {
      return "noTokenElse";
    }
  }
  private normalizaFecha(date: Date): string {
    return formatDate(date, "dd-MM-yyyy", this.locale);
  }
}
