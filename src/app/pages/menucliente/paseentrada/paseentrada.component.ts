import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paseentrada',
  templateUrl: './paseentrada.component.html',
  styleUrls: ['./paseentrada.component.css']
})
export class PaseentradaComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
