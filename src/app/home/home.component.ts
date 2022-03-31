import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {}

  public onClick(elementID: string): void {
    this.viewportScroller.scrollToAnchor(elementID);
  }

  textoInicio1 =
    'En Nutrarias Health cuidamos tu salud ofreciendo un servicio íntegro y de calidad a través de un equipo multidisciplinar con los mejores profesionales en nutrición, entrenamiento personal y psicología. ';
  textoInicio2 =
    ' Nuestra metodología está diseñada específicamente para trabajar de forma personalizada y adaptada a las características de cada uno de nuestros pacientes, ofreciendo las mayores facilidades y una completa cobertura asistencial, siempre con el objetivo de lograr los mejores resultados en salud y calidad de vida.';
}
