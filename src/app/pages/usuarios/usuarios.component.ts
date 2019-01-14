import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap';
import { UsuarioscuComponent } from './usuarioscu/usuarioscu.component';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';
import { DTCONFIG_DELETE_EDIT_BTNS, SWALCONFIG_CONFIRMDELETE, SWALCONFIG_TOAST } from 'src/app/config/config';

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

  constructor(
    private modalService: BsModalService,
    public _usuarioService: UsuarioService,
  ) {
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

    this.source = new LocalDataSource();
    this.getUsuarios();
  }

  ngOnInit() { }

  onDelete(event) {
    this.eliminarUsuario(event.data._id);
  }

  onEdit(event) {
    this.editarUsuario(event.data._id);
  }
  getUsuarios() {
    this._usuarioService.listaUsuarios().subscribe(
      (res: any) => {
        this.source.load(res.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  eliminarUsuario(id) {
    const config = SWALCONFIG_CONFIRMDELETE;
    config.text = 'Se eliminará permamentemente el registro';

    swal(config).then(result => {
      if (result.value) {
        this._usuarioService.eliminarUsuario(id).subscribe(
          res => {
            this.getUsuarios();
            // tslint:disable-next-line:prefer-const
            let configtoast = SWALCONFIG_TOAST;
            configtoast.title = 'Se eliminó el registro';
            swal(configtoast);
          },
          error => {
            // tslint:disable-next-line:prefer-const
            let configtoastdel = SWALCONFIG_TOAST;
            configtoastdel.title = 'Error al eliminar el usuario';
            swal(configtoastdel);
          }
        );
      } else if (result.dismiss === swal.DismissReason.cancel) {
        // boton cancelar presionado
      }
    });
  }

  openModal() {
    const modalRef = this.modalService.show(UsuarioscuComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Registrar nuevo usuario',
        data: {}
      }
    });

    modalRef.content.action.subscribe(() => {
      this.getUsuarios();
    });
  }


  editarUsuario(id) {
    const modalRef = this.modalService.show(UsuarioscuComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Registrar nuevo usuario',
        data: {
          edit: true,
          _id: id,
        }
      }
    });

    modalRef.content.action.subscribe(() => {
      this.getUsuarios();
    });

  }
}
