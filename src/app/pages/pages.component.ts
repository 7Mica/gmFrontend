import { Component, OnInit, AfterViewInit } from '@angular/core';
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit, AfterViewInit {

  constructor() {  }

  ngOnInit() {
    init_plugins();
  }

  ngAfterViewInit(): void {
  }

}
