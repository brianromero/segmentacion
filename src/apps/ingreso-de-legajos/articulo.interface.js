"use strict";
var ArticuloInterface = (function () {
    function ArticuloInterface(codarticulo, descripcion, marca, modelo, nunserie, unidad, cantidad) {
        if (codarticulo === void 0) { codarticulo = 0; }
        if (descripcion === void 0) { descripcion = ''; }
        if (marca === void 0) { marca = ''; }
        if (modelo === void 0) { modelo = ''; }
        if (nunserie === void 0) { nunserie = ''; }
        if (unidad === void 0) { unidad = ''; }
        if (cantidad === void 0) { cantidad = 0; }
        this.codarticulo = codarticulo;
        this.descripcion = descripcion;
        this.marca = marca;
        this.modelo = modelo;
        this.nunserie = nunserie;
        this.unidad = unidad;
        this.cantidad = cantidad;
    }
    return ArticuloInterface;
}());
exports.ArticuloInterface = ArticuloInterface;
//# sourceMappingURL=articulo.interface.js.map