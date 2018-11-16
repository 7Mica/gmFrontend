import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef, ModalDirective } from "ngx-bootstrap";
import { UsuarioscuComponent } from "./usuarioscu/usuarioscu.component";
import { UsuarioService } from "src/app/services/service.index";
import swal from "sweetalert2";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  source: LocalDataSource;

  settings = {
    actions:{
      columnTitle: 'Acciones',
      add: false,
      delete: false,
      edit: false,
      position: 'right',
      custom: [
        {
          name: 'edit',
          title: '<i title="Editar" class="btn btn-success btn-circle fa fa-link"></i> ',
          
        },
        {
          name: 'delete',
          title: '<i title="Eliminar" class="btn btn-danger btn-circle fa fa-times"></i> ',
        },
      ],
    },
    columns: {
      
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
     
    }
  };

  usuario: any;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public _usuarioService: UsuarioService,
  ) {
    this.source = new LocalDataSource();
    this.getUsuarios();


  }

  ngOnInit() { }

  onCustom(event) {
    console.log(event);
    
    if(event.action === 'edit'){
      this.editarUsuario(event.data._id);
    }else{
      this.eliminarUsuario(event.data._id);
      this.getUsuarios();
    }
    
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
    swal({
      title: "¿Estás seguro?",
      text: "Se eliminará permamentemente el usuario",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, Cancelar"
    }).then(result => {
      if (result.value) {
        this._usuarioService.eliminarUsuario(id).subscribe(
          res => {
            console.log(res);
            this.getUsuarios();

            swal("Usuario eliminado", "Petición correcta", "success");
          },
          error => {
            swal("Error", "Ocurrío algo en la petición", "error");
          }
        );
      } else if (result.dismiss === swal.DismissReason.cancel) {
        //boton cancelar presionado
      }
    });
  }

  openModal() {
    let modalRef = this.modalService.show(UsuarioscuComponent, {
      class: "modal-lg",
      initialState: {
        title: "Registrar nuevo usuario",
        data: {}
      }
    });

    modalRef.content.action.take(1).subscribe(() => {
      this.getUsuarios();
    });
  }


  editarUsuario(id) {
    let modalRef = this.modalService.show(UsuarioscuComponent, {
      class: "modal-lg",
      initialState: {
        title: "Registrar nuevo usuario",
        data: {
          edit: true,
          _id: id,
        }
      }
    });
  }
}
