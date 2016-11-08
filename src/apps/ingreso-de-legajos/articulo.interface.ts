export class ArticuloInterface {
    constructor(
        public codarticulo : number = 0,
        public descripcion : string = '',
        public marca : string = '',
        public modelo : string = '',
        public nunserie : string = '',
        public unidad : string = '',
        public cantidad : number = 0,

    ){}
}