export interface ISistemas {
        id_sistema: string,
        des_sist: string,
        nom_sist: string,
        codigo_sist: string,
        flag_activo: string,
        flag_eliminado: string,
        usr_creacion: string,
        fec_creacion: string,
        fec_edicion: string
}

export class Sistema {
        id_sistema: string = '';
        des_sist: string = '';
        nom_sist: string = '';
        codigo_sist: string = '';
        flag_activo: string = '';
        flag_eliminado: string = '';
        usr_creacion: string = '';
        fec_creacion: string = '';
        fec_edicion: string = ''
}