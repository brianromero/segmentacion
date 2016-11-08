export class Local {
    constructor(
        public id_local: string = '',
        public nombre_local: string = '',
        public direccion: string = '',
        public referencia: string = '',
        public telefono_local: string = '',
        public total_pea: number = 0,
        public total_aulas_max: number = 0,
        public funcionario_nombre: string = '',
        public funcionario_email: string = '',
        public funcionario_celular: string = '',
        public contacto_nombre: string = '',
        public contacto_email: string = '',
        public contacto_celular: string = '',
        public estado: string = '',
        public usr_registro: string = '',
        public ubigeo: string = '',
    ) {
    }
}

export class Aula {
    constructor(
        public id_local: string = '',
        public num_aula: string = '',
        public mobiliario: string = '',
        public internet: boolean = false,
        public audio: boolean = false,
        public proyector: boolean = false,
        public pizarra: boolean = false,
        public mesas: string = '',
        public sillas: string = '',
        public unipersonales: string = '',
        public bipersonales: string = '',
    ) {
    }
}