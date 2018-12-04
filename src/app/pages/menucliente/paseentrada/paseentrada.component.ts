import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';
import { PasesService, UsuarioService, UsuarioeventoService } from 'src/app/services/service.index';
import { Subject } from 'rxjs';
import { SWALCONFIG_TOAST } from 'src/app/config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-paseentrada',
  templateUrl: './paseentrada.component.html',
  styleUrls: ['./paseentrada.component.css']
})
export class PaseentradaComponent implements OnInit {
  titulo = 'Marte y la Tierra';

  colorCabecera = '#000000';
  colorCuerpo = '#ffffff';
  colorPie = '#000000';
  colorCabeceraLetra = '#ffffff';
  colorCuerpoLetra = '#000000';
  colorPieLetra = '#ffffff';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private pasesService: PasesService) {

      this.getColoresPase();
  }

  ngOnInit() {
  }

  generarInvitaciones () {

    const data = {
      colorCabecera: this.colorCabecera,
      colorCuerpo: this.colorCuerpo,
      colorPie: this.colorPie,
      colorCabeceraLetra: this.colorCabeceraLetra,
      colorCuerpoLetra: this.colorCuerpoLetra,
      colorPieLetra: this.colorPieLetra,
      idevento: this.activatedRoute.snapshot.params.idevento
    };

    this.pasesService.mandarPases(data).subscribe(
      (res: any) => {
        console.log(res);

      },
      (error: any) => {
        console.log(error);

      });

  }

  getColoresPase() {
    this.pasesService.getPaseByEventoId(this.activatedRoute.snapshot.params.idevento).subscribe(
      (res: any) => {
        if (res.data === null) { return; }

        this.colorCabecera = res.data.colorCabecera;
        this.colorCuerpo = res.data.colorCuerpo;
        this.colorPie = res.data.colorPie;
        this.colorCabeceraLetra = res.data.colorCabeceraLetra;
        this.colorCuerpoLetra = res.data.colorCuerpoLetra;
        this.colorPieLetra = res.data.colorPieLetra;
      },

      error => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Ocurrió un error al cargar los colores';
        swal(toast);

      }
    );
  }

  guardarColores() {

    const data = {
      colorCabecera: this.colorCabecera,
      colorCuerpo: this.colorCuerpo,
      colorPie: this.colorPie,
      colorCabeceraLetra: this.colorCabeceraLetra,
      colorCuerpoLetra: this.colorCuerpoLetra,
      colorPieLetra: this.colorPieLetra,
      idevento: this.activatedRoute.snapshot.params.idevento,
    };

    this.pasesService.editarPase(data).subscribe(
      (res: any) => {

        const toast = SWALCONFIG_TOAST;
        toast.type = 'success';
        toast.title = 'Se actualizarón los colores del pase';
        swal(toast);
      },

      error => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Ocurrió un error al guardar los colores';
        swal(toast);

      });

  }

  download() {

    // tslint:disable-next-line:prefer-const
    let doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');

    // Save the PDF
    doc.save('Test.pdf');
  }

  fontSize(e) {
    console.log(e);


  }

}
