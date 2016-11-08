"use strict";
var CabPecosaInterface = (function () {
    function CabPecosaInterface(idpecosa, anio, fechapedido) {
        if (idpecosa === void 0) { idpecosa = 0; }
        if (anio === void 0) { anio = 0; }
        if (fechapedido === void 0) { fechapedido = ''; }
        this.idpecosa = idpecosa;
        this.anio = anio;
        this.fechapedido = fechapedido;
    }
    return CabPecosaInterface;
}());
exports.CabPecosaInterface = CabPecosaInterface;
//# sourceMappingURL=cabpecosa.interface.js.map