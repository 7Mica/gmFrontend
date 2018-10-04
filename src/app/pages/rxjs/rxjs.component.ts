import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {



  suscription: Subscription;
  constructor() {
    // this.regresaObservable().pipe(
    //   retry(2)
    // )

    this.suscription = this.regresaObservable().subscribe(
      numero => {
        console.log("Subs", numero);
      },
      error => {
        console.error(error);
      },
      () => {
        console.log("Se completo");
      }
    );
  }

  ngOnDestroy(): void {
   this.suscription.unsubscribe();
  }

  ngOnInit() {}

  regresaObservable(): Observable<any> {
    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next(/*salida*/contador);
        // if(contador===3){

        //   observer.complete();
        // }
        //Probar error
        // if(contador === 2){
        //   // clearInterval(intervalo);
        //   observer.error('auxilio');
        // }
      }, 500);
    }).pipe(/*
      map(resp => {
        return resp.valor;
      }),*/
      filter((valor, index) => {
        if (valor === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
