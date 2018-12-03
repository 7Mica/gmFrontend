import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService, UsuarioService, ConferenciaService, UsuarioeventoService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { SWALCONFIG_CONFIRMDELETE, SWALCONFIG_TOAST } from 'src/app/config/config';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventocuComponent } from '../eventos/eventocu/eventocu.component';

@Component({
  selector: 'app-menucliente',
  templateUrl: './menucliente.component.html',
  styleUrls: ['./menucliente.component.css']
})
export class MenuclienteComponent implements OnInit {

  existe = false;

  modalRef: BsModalRef;

  idevento: string;
  evento: any = {};
  cantidadConferencias: number;
  cantidadMarcas: number;
  cantidadUsuarios: number;

  constructor(
    public activatedRoute: ActivatedRoute,
    private eventoService: EventoService,
    public router: Router,
    private usuarioService: UsuarioService,
    private usuarioEventoService: UsuarioeventoService,
    private conferenciasService: ConferenciaService,
    private modalService: BsModalService
  ) {

    this.idevento = this.activatedRoute.snapshot.params.idevento;

    this.eventoService.getEventoById(this.activatedRoute.snapshot.params.idevento).subscribe(
      (res: any) => {
        if (res.data === null || res.ok === false) {
          this.router.navigate(['/eventos']);
        } else {
          this.existe = true;
        }
      },

      error => {
        this.router.navigate(['/eventos']);
      }
    );

    this.getEventoInfo(this.idevento);
    this.getTodoCount(this.idevento);

  }

  ngOnInit() {

  }

  queEs() {
    if (this.usuarioService.tipoLogin() === false) {
      return false;
    } else {
      return true;
    }
  }

  getEventoInfo(idevento) {
    this.eventoService.getEventoById(idevento).subscribe(
      (res: any) => {
        this.evento = res.data;

      },

      error => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Error al obtener información del evento';
        swal(toast);

      }
    );
  }

  editarEvento(idevento) {
    const modalRef = this.modalService.show(EventocuComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Editar evento',
        idevento: idevento
      }
    });

    modalRef.content.action.subscribe(() => {
      this.getEventoInfo(idevento);
    });

  }

  eliminarEvento(idevento) {
    swal(SWALCONFIG_CONFIRMDELETE).then(result => {
      if (result.value) {
        const toast = SWALCONFIG_TOAST;
        this.eventoService.removeEvento(idevento).subscribe(
          res => {
            this.router.navigate(['/eventos']);
            toast.type = 'success';
            toast.title = 'Se eliminó el registro correctamente';
            swal(toast);
          },
          error => {
            toast.type = 'error';
            toast.title = 'Error en la peticion';
            swal(toast);
          }
        );
      } else if (result.dismiss === swal.DismissReason.cancel) {
        // boton cancelar presionado
      }
    });
  }

  getTodoCount(idevento) {
    this.conferenciasService.getConferenciaCount(idevento).subscribe(
      (res: any) => {

        this.cantidadConferencias = res.data;
      },

      error => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Error al obtener número de conferencias';
        swal(toast);

      });

      this.usuarioEventoService.getCountById(idevento).subscribe(
        (res: any) => {
          this.cantidadUsuarios = res.data;

        },

        error => {

        }
      );

      this.eventoService.getMarcasByEvento(idevento).subscribe(
        (res: any) => {
          this.cantidadMarcas = res.data.marcas.length;

        },

        error => {

        }
      );
  }
}
