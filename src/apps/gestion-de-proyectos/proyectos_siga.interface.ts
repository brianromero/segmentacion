/*
export interface IProyectosSiga {
    id: string,
    annio_meta: string,
    codi_meta: string,
    cod_proyecto: string,
    desc_proyecto: string,
    CODI_DEPE_TDE: string,
    codi_depe_apro: string,
    sigla:string
}
*/

export interface IProyectosSiga {
    id_proyecto: string,
    desc_proyecto: string,
    cod_proyecto: string,
    codi_Meta: string,
    modalidad: string,
    CODI_DEPE_TDE: string,
    annio_meta: string,
    objetivo: string
}