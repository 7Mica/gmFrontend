export class Usuario {
    constructor(
        public nombre: string,
        public apellidoPaterno: string,
        public apellidoMaterno: string,
        public fechadenacimiento: string,
        public calle: string,
        public estado: string,
        public ciudad: string,
        public referencias: string,
        public codigopostal: string,
        public colonia: string,
        public numeroexterior: string,
        public numerointerior: string,
        public evento: string,
        public rol='USER_ROLE',
        public email: string,
        public password: string,
        public img?: string,
        ){
        
    }
}