import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventoService } from 'src/app/services/service.index';
import { Marca } from 'src/app/models/marca.model';

@Component({
  selector: 'app-marcascu',
  templateUrl: './marcascu.component.html',
  styleUrls: ['./marcascu.component.css']
})
export class MarcascuComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  forma: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    public modalService: BsModalService,
    private eventoService: EventoService,
  ) { }

  ngOnInit() {
    this.forma = new FormGroup({
      titulo: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      img: new FormControl(null, []),
      telefono: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      ciudad: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      estado: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      representante: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      ambito: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      telefonodos: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      
    });
  }

  registrarEvento() {
    if (this.forma.invalid) {
      return;
    }

    let idevento: any = this.modalService.config.initialState;

    let marca = new Marca(
      this.forma.value.titulo,
      this.forma.value.telefono,
      this.forma.value.ciudad,
      this.forma.value.estado,
      this.forma.value.representante,
      this.forma.value.ambito,
      this.forma.value.telefonodos,

    );

    console.log(marca);

    this.eventoService.newMarca(idevento.data, marca).subscribe(
      res => {
        console.log('PASOOOOO', res);
        
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        console.log(error);
      }
    );
  }

}
