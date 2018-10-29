import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Evento } from 'src/app/models/evento.model';
import { EventoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-eventocu',
  templateUrl: './eventocu.component.html',
  styleUrls: ['./eventocu.component.css']
})
export class EventocuComponent implements OnInit {
  @Output()
  action = new EventEmitter();
  forma: FormGroup;

  constructor(public modalRef: BsModalRef,
    public modalService: BsModalService,
    private _eventoService: EventoService) { }

  ngOnInit() {

    this.forma = new FormGroup(
      {
        titulo: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        descripcion: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]),
        telefono: new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]),
        telefonodos: new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)]),

        cliente: new FormControl(null, [
          Validators.required, 
          Validators.email]),

        fechainicio: new FormControl(null, [Validators.required]),
        fechadefinalizacion: new FormControl(null, [Validators.required,]),

        img: new FormControl(null, []),
        
        calle: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        estado: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        ciudad: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        referencias: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        cp: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ]),
        colonia: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        numeroexterior: new FormControl(null, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]),
        numerointerior: new FormControl(null, [
          Validators.maxLength(50),
        ]),
        
      }
    );
  }

  registrarEvento() {
    if (this.forma.invalid) {
      return;
    }

    let evento = new Evento(
      this.forma.value.titulo,
      this.forma.value.descripcion,
      this.forma.value.telefono,
      this.forma.value.telefonodos,
      this.forma.value.cliente,
      this.forma.value.calle,
      this.forma.value.numeroInterior,
      this.forma.value.numeroExterior,
      this.forma.value.cp,
      this.forma.value.colonia,
      this.forma.value.ciudad,
      this.forma.value.estado,
      this.forma.value.referencias,
      this.forma.value.fechacreacion,
      this.forma.value.fechainicio,
    );

    console.log(evento);

    this._eventoService.crearEvento(evento).subscribe(
      res => {
        console.log("Evento guardado");
        console.log(res);
        
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        console.log(error);
      }
    );
  }
}
