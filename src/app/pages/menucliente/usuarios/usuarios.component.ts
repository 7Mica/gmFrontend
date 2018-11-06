import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UsuarioService, UsuarioeventoService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { UsuariocComponent } from './usuarioc/usuarioc.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public data: any[] = [];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";

  usuario: any;
  modalRef: BsModalRef;

  constructor(private router: Router, private modalService: BsModalService,
    public _usuarioService: UsuarioeventoService, private activatedRoute: ActivatedRoute) { 
      this.getUsuarios();
  }

  ngOnInit() {
  }

  getUsuarios() {
    
    let eventoid = this.activatedRoute.snapshot.params.idevento;

    this.data = [];
    this._usuarioService.listaUsuarios(eventoid).subscribe(
      (res: any) => {
        console.log(res);
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
    

    let modalRef = this.modalService.show(UsuariocComponent, {
      class: "modal-lg",
      initialState: {
        title: "Registrar nuevo usuario",
        data: {idevento: this.activatedRoute.snapshot.params}
      }
    });

    modalRef.content.action.take(1).subscribe(() => {
      this.getUsuarios();
    });
  }

  
  editarUsuario(id) {    
    let modalRef = this.modalService.show(UsuariocComponent, {
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
