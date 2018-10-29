import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef, ModalDirective } from "ngx-bootstrap";
import { UsuarioscuComponent } from "./usuarioscu.component";
import { UsuarioService } from "src/app/services/service.index";
import swal from "sweetalert2";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  public data: any[] = [];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";

  usuario: any;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    public _usuarioService: UsuarioService
  ) {
    this.getUsuarios();
  }

  ngOnInit() {}

  getUsuarios() {
    this.data = [];

    this._usuarioService.listaUsuarios().subscribe(
      (res: any) => {
        res.data.forEach(element => {
          this.data.push(element);
        });
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
