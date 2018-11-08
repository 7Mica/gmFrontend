export class Conferencia {
  constructor(
    public titulo: string ,
    public hora: string,
    public salon: string,
    public descripcion: string,
    public duracion: string,
    public ponente: string,
    public fecha: string,
    public evento: string,
    public img?: string
  ) {}
}
