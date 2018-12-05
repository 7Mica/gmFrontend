import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UsuarioService, UsuarioeventoService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { UsuariocComponent } from './usuarioc/usuarioc.component';
import { LocalDataSource } from 'ng2-smart-table';
import { DTCONFIG_DELETE_EDIT_BTNS, SWALCONFIG_TOAST, SWALCONFIG_CONFIRMDELETE } from 'src/app/config/config';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  source: LocalDataSource;
  settings = DTCONFIG_DELETE_EDIT_BTNS;

  usuario: any;
  modalRef: BsModalRef;

  constructor(private router: Router, public modalService: BsModalService,
    public _usuarioService: UsuarioeventoService, private activatedRoute: ActivatedRoute) {
      this.source = new LocalDataSource();
      this.settings.columns = {

        nombre: {
          title: 'Nombre'
        },
        apellidoPaterno: {
          title: 'Apellido Paterno'
        },
        apellidoMaterno: {
          title: 'Apellido Materno'
        },
        email: {
          title: 'Email'
        },
        rol: {
          title: 'Rol de usuario'
        },

      };
    this.getUsuarios();
  }

  ngOnInit() {
  }

  onDelete(event) {
    // tslint:disable-next-line:prefer-const
    let toast = SWALCONFIG_TOAST;
    // tslint:disable-next-line:prefer-const
    let alert = SWALCONFIG_CONFIRMDELETE;
    alert.title = '¿Estás seguro?';
    alert.text = 'Se eliminará permamentemente el usuario';

    swal(alert).then(result => {
      if (result.value) {
        this._usuarioService.eliminarUsuario(event.data._id).subscribe(
          res => {

            this.getUsuarios();
            toast.title = 'El usuario se eliminó correctamente';
            toast.type = 'success';
            swal(toast);
          },
          error => {
            toast.title = 'Ocurrió un error en la petición';
            toast.type = 'error';
            swal(toast);
          }
        );
      } else if (result.dismiss === swal.DismissReason.cancel) {
        // boton cancelar presionado
      }
    });
  }

  onEdit(event) {

    const modalRef = this.modalService.show(UsuariocComponent, {
      class: 'modal-lg',
      initialState: {
        titulo: 'Editar usuario',
          edit: true,
          _id: event.data._id,
          idevento: this.activatedRoute.snapshot.params.idevento
      }
    });

    modalRef.content.action.subscribe(() => {
      this.getUsuarios();
    });
  }

  getUsuarios() {

    const eventoid = this.activatedRoute.snapshot.params.idevento;

    this._usuarioService.listaUsuarios(eventoid).subscribe(
      (res: any) => {
        this.source.load(res.data);
      },
      err => {
        // tslint:disable-next-line:prefer-const
        let toast = SWALCONFIG_TOAST;
        toast.title = 'Ocurrió un error al cargar usuarios';
        toast.type = 'error';
        swal(toast);
      }
    );
  }

  openModal() {

    const modalRef = this.modalService.show(UsuariocComponent, {
      class: 'modal-lg',
      initialState: {
        titulo: 'Registrar nuevo usuario',
        idevento: this.activatedRoute.snapshot.params.idevento,
        edit: false
      }
    });

    modalRef.content.action.subscribe(() => {
      this.getUsuarios();
    });
  }

}
