import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UsuarioscuComponent } from './usuarioscu.component';
import { UsuarioService } from 'src/app/services/service.index';

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

  modalRef: BsModalRef;


  constructor(private _http: Http, private modalService: BsModalService, public _usuarioService: UsuarioService) { 

    this.getUsuarios();
  }

  ngOnInit() {
  
  }

  getUsuarios(){
    this.data = [];

    this._usuarioService.listaUsuarios().subscribe((res: any) => {

      res.data.forEach(element => {

        this.data.push(element);
        
        
      });
      

    }, err=> {
      console.log(err);
      
    });


  }


  openModal() {
    this.modalRef = this.modalService.show(UsuarioscuComponent, { class: 'modal-lg',
      initialState: {
        title: 'Registrar nuevo usuario',
        data: {}
      }
    });
  }

}
