export class DetPecosaInterface {
    constructor(
        /*
        public idpecosa : number = 0,
        public anio : number = 0,
        // public fechapedido : string = '',
        // public fechaaprob : string = '',
        public detallepecosa__idarticulo : string='',
        public detallepecosa__idarticulo__idmarca__descripcion : string='',
        public detallepecosa__idarticulo__nombreart : string='',
        public detallepecosa__idarticulo__idunidad__descripcion : string='',
        public detallepecosa__cantidadsol : number = 0,
        public detallepecosa__cantidadapro : number = 0,
        public detallepecosa__idarticulo__idmarca : number = 0,
        public detallepecosa__idarticulo__idunidad : number = 0*/

        public nro_pecosa: string = '',
        public nro_pedido: string = '',
        public secuencia: number = 0,
        public codigo: string = '',
        public cant_solicitada: number = 0,

        public bien: string = '',

        public unidad_de_medida: string = '',
        public marca: string = '',
        // public fechapedido : string = '',
        // public fechaaprob : string = '',

        public cant_atendida: number = 0,
        public precio_unit: string = '',
        public valor_total: string = ''



    ) {}
}