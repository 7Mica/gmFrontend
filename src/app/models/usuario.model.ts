export class Usuario {
    constructor(
        public email: string,
        public password: string,
        public nombre?: string,
        public apellidoPaterno?: string,
        public apellidoMaterno?: string,
        public img?: string,
        public fechadenacimiento?: string,
        public direccion?: string,
        public estado?: string,
        public cp?: string,
        public ciudad?: string,
        public rol='USER_ROLE',
        ){
        
    }
}