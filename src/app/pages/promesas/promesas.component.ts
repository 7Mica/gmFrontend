import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    
    

    this.contarTres().then((contador)=>{
      console.log('termino');
      
    }).catch(()=>{
      console.log();
    });

   }

  ngOnInit() {
  }

  contarTres(){

    return new Promise((resolve, rejected)=>{
      let contador: number = 0;

     let intervalo = setInterval(()=>{
        contador+=1;
        console.log(contador);
        if(contador === 3){
          resolve();
          clearInterval(intervalo);
          
        }
      }, 500);

    });

    

  }

}
