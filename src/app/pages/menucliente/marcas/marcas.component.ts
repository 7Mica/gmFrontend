import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { EventoService } from 'src/app/services/service.index';
import { MarcascuComponent } from './marcascu/marcascu.component';
import swal from 'sweetalert2';
import { SWALCONFIG_TOAST, SWALCONFIG_CONFIRMDELETE } from 'src/app/config/config';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  marcas: any[] = [];

  tempMarcas: any[] = [];

  busqueda: string;

  modalRef: BsModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private eventoService: EventoService
  ) {
    this.listaMarcas();

  }

  ngOnInit() { }

  openModal() {
    const evento = this.activatedRoute.snapshot.params.idevento;

    const modalRef = this.modalService.show(MarcascuComponent, {
      class: 'modal-xl',
      initialState: {
        title: 'Crear nueva marca',
        data: evento
      }
    });

    modalRef.content.action.subscribe(() => {
      this.listaMarcas();
    });
  }

  eliminarMarca(id) {
    swal(SWALCONFIG_CONFIRMDELETE)
      .then(answ => {
        if (answ.value) {
          this.eventoService.deleteMarca(id).subscribe(
            res => {
              const toast = SWALCONFIG_TOAST;
              toast.type = 'success';
              toast.title = 'Se eliminó el registro correctamente';
              this.listaMarcas();
              swal(toast);
            },

            error => {
              const toast = SWALCONFIG_TOAST;
              toast.type = 'error';
              toast.title = 'Ocurrió un error en la petición';
              swal(toast);

            }
          );
        } else {

        }
      })
      .catch(error => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Ocurrió un error en la petición';
        swal(toast);
      });

  }

  sortBy(metodo) {
    switch (metodo) {
      case 'nombre':
        this.marcas.sort((a, b) => a.titulo < b.titulo ? -1 : 1);
        break;

      default:
        break;
    }
  }

  findMarca(e) {
    if (e.key === 'Escape') {
      this.busqueda = '';
      this.marcas = this.tempMarcas;
    } else {
      this.marcas = this.marcas.filter((item: any) => (item.titulo.indexOf(this.busqueda) > -1));
    }
  }

  modificarMarca(id) {
    const evento = this.activatedRoute.snapshot.params.idevento;

    const modalRef = this.modalService.show(MarcascuComponent, {
      class: 'modal-xl',
      initialState: {
        title: 'Editar marca',
        idmarca: id,
        idevento: evento
      }
    });

    modalRef.content.action.subscribe(() => {
      this.listaMarcas();
    });

  }

  listaMarcas() {
    const idevento = this.activatedRoute.snapshot.params.idevento;
    this.eventoService.getMarcasByEvento(idevento).subscribe(
      (res: any) => {
        this.marcas = res.data.marcas;
        this.tempMarcas = res.data.marcas;

      },
      error => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Ocurrió un error en la petición';
        swal(toast);
      }
    );
  }
}
