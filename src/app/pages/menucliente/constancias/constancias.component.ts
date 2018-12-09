import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from 'src/app/services/service.index';
import { SWALCONFIG_TOAST } from 'src/app/config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-constancias',
  templateUrl: './constancias.component.html',
  styleUrls: ['./constancias.component.css']
})
export class ConstanciasComponent implements OnInit {

  header = `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
  Tempore reprehenderit doloribus eaque dolorum aut maxime`;

  dirigido = `Lorem ipsum dolor sit amet consectetur, adipisicing elit.`;

  body = `Lorem ipsum dolor sit amet, consectetur adipisicing **nombreCompleto** elit. Mollitia **evento** nobis ipsa aspernatur soluta,
  ex alias quod fugiat neque provident voluptate temporibus maxime sunt, porro culpa vero aperiam laborum dolores
  aliquam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nobis ipsa aspernatur soluta, ex alias
  quod fugiat neque provident voluptate temporibus maxime sunt, porro culpa vero aperiam laborum dolores aliquam.
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia nobis ipsa aspernatur soluta, ex alias quod
  fugiat neque provident voluptate temporibus maxime sunt, porro culpa vero aperiam laborum dolores aliquam.`;

  leftimage: any = 'https://via.placeholder.com/140';
  rightimage: any = 'https://via.placeholder.com/140';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService) {
    this.getConstancia();
  }

  ngOnInit() {
  }

  guardarConstancia() {

    this.eventoService.saveConstancia({
      cabecera: this.header,
      dirigido: this.dirigido,
      cuerpo: this.body,
      evento: this.activatedRoute.snapshot.params.idevento,
      leftimage: this.leftimage,
      rightimage: this.rightimage
    }).subscribe(
      res => {
        const toast = SWALCONFIG_TOAST;
        toast.title = 'Constancia guardada';
        toast.type = 'success';
        swal(toast);

      },
      error => {
        const toast = SWALCONFIG_TOAST;
        toast.title = 'Ocurrió un error en la petición';
        toast.type = 'error';
        swal(toast);

      }
    );

  }

  changeListener($event): void {
    this.readThis($event.target);
  }



  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      if (inputValue.name === 'leftimage') {

        this.leftimage = myReader.result;
      }
      if (inputValue.name === 'rightimage') {

        this.rightimage = myReader.result;
      }

    };
    myReader.readAsDataURL(file);
  }

  generarConstancias() {
    this.eventoService.generarConstancias({
      evento: this.activatedRoute.snapshot.params.idevento,
      cuerpo: this.body,
      cabecera: this.header,
      dirigido: this.dirigido,
      leftimage: this.leftimage,
      rightimage: this.rightimage
    }).subscribe(
      res => {
        console.log(res);

      },
      error => {
        console.log(error);

      }
    );
  }

  getConstancia() {
    this.eventoService.getConstancia(this.activatedRoute.snapshot.params.idevento).subscribe(
      (res: any) => {
        if (res.data) {
          this.header = res.data.cabecera;
          this.body = res.data.cuerpo;
          this.dirigido = res.data.dirigido;
          this.leftimage = (res.data.leftimg) ? res.data.leftimg : this.leftimage;
          this.rightimage = (res.data.leftimg) ? res.data.rightimg : this.rightimage;
        } else {
          return;
        }

      },
      error => {
        console.log(error);

      }
    );
  }

  enter(ev) {
    this.header += '<br>';

  }

  enterDirigido(ev) {
    this.dirigido += '<br>';

  }
  enterBody(ev) {
    this.header += '<br>';

  }
}
