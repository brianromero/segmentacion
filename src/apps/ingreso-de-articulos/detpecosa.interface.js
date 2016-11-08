"use strict";
var DetPecosaInterface = (function () {
    function DetPecosaInterface(idpecosa, anio, 
        // public fechapedido : string = '',
        // public fechaaprob : string = '',
        detallepecosa__idarticulo, detallepecosa__idarticulo__idmarca__descripcion, detallepecosa__idarticulo__nombreart, detallepecosa__idarticulo__idunidad__descripcion, detallepecosa__cantidadsol, detallepecosa__cantidadapro, detallepecosa__idarticulo__idmarca, detallepecosa__idarticulo__idunidad) {
        if (idpecosa === void 0) { idpecosa = 0; }
        if (anio === void 0) { anio = 0; }
        if (detallepecosa__idarticulo === void 0) { detallepecosa__idarticulo = ''; }
        if (detallepecosa__idarticulo__idmarca__descripcion === void 0) { detallepecosa__idarticulo__idmarca__descripcion = ''; }
        if (detallepecosa__idarticulo__nombreart === void 0) { detallepecosa__idarticulo__nombreart = ''; }
        if (detallepecosa__idarticulo__idunidad__descripcion === void 0) { detallepecosa__idarticulo__idunidad__descripcion = ''; }
        if (detallepecosa__cantidadsol === void 0) { detallepecosa__cantidadsol = 0; }
        if (detallepecosa__cantidadapro === void 0) { detallepecosa__cantidadapro = 0; }
        if (detallepecosa__idarticulo__idmarca === void 0) { detallepecosa__idarticulo__idmarca = 0; }
        if (detallepecosa__idarticulo__idunidad === void 0) { detallepecosa__idarticulo__idunidad = 0; }
        this.idpecosa = idpecosa;
        this.anio = anio;
        this.detallepecosa__idarticulo = detallepecosa__idarticulo;
        this.detallepecosa__idarticulo__idmarca__descripcion = detallepecosa__idarticulo__idmarca__descripcion;
        this.detallepecosa__idarticulo__nombreart = detallepecosa__idarticulo__nombreart;
        this.detallepecosa__idarticulo__idunidad__descripcion = detallepecosa__idarticulo__idunidad__descripcion;
        this.detallepecosa__cantidadsol = detallepecosa__cantidadsol;
        this.detallepecosa__cantidadapro = detallepecosa__cantidadapro;
        this.detallepecosa__idarticulo__idmarca = detallepecosa__idarticulo__idmarca;
        this.detallepecosa__idarticulo__idunidad = detallepecosa__idarticulo__idunidad;
    }
    return DetPecosaInterface;
}());
exports.DetPecosaInterface = DetPecosaInterface;
//# sourceMappingURL=detpecosa.interface.js.map