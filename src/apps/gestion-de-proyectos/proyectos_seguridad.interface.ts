export interface IProyectoSeguridad {
    id_proyecto: string;
    sigla_proy: string;
    anio_proy: string;
    des_proy: string;
    tipo_proy: string;
    sistemas: Array<Object>;
    fec_inicio: string,
    fec_final:string,
    observacion:string,
    flag_activo:string,
    usr_creacion:string,
    fec_creacion:string,
    cod_meta:string
}

export class ProyectoSeguridad {
    sigla_proy: string = '';
    anio_proy: string = '';
    des_proy: string = '';
    flag_activo:string = '';
    cod_meta:string = '';
}