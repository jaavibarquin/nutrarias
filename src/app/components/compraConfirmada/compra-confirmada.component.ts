import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-compra-confirmada',
  templateUrl: './compra-confirmada.component.html',
  styleUrls: ['./compra-confirmada.component.css'],
})
export class CompraConfirmadaComponent implements AfterViewInit {
  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    this.compraRealizadaCorrectamente();
  }

  compraRealizadaCorrectamente() {
    Swal.fire({
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/nutrariashealth.appspot.com/o/imagenes%2Flogo200x200.png?alt=media&token=92359e54-f60b-4603-bd92-260f5e528586',

      icon: 'success',
      title: '¡Muchas gracias por su confianza!',
      text: 'La compra se ha realizado correctamente!',
      confirmButtonText:
        '<a class="text-white" href="/cita-online">Pide tu Cita</a>',
      timer: 4400,
    });
  }
  volverAInicio() {
    this.router.navigate(['/home']);
  }
}
