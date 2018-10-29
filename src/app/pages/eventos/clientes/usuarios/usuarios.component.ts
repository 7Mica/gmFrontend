import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private sharedService: SharedService) { 
   
   
  }

  ngOnInit() {
  }

}
