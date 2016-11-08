"use strict";
var AlmacenInterface = (function () {
    function AlmacenInterface(idalmacen, nombre) {
        if (idalmacen === void 0) { idalmacen = 0; }
        if (nombre === void 0) { nombre = ''; }
        this.idalmacen = idalmacen;
        this.nombre = nombre;
    }
    return AlmacenInterface;
}());
exports.AlmacenInterface = AlmacenInterface;
//# sourceMappingURL=almacen.interface.js.map