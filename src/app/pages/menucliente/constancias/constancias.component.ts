import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-constancias',
  templateUrl: './constancias.component.html',
  styleUrls: ['./constancias.component.css']
})
export class ConstanciasComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
