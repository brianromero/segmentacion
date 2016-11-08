"use strict";
var ArticuloInterface = (function () {
    function ArticuloInterface(idarticulo, nombreart, marca, unidadmed) {
        if (idarticulo === void 0) { idarticulo = 0; }
        if (nombreart === void 0) { nombreart = ''; }
        if (marca === void 0) { marca = ''; }
        if (unidadmed === void 0) { unidadmed = ''; }
        this.idarticulo = idarticulo;
        this.nombreart = nombreart;
        this.marca = marca;
        this.unidadmed = unidadmed;
    }
    return ArticuloInterface;
}());
exports.ArticuloInterface = ArticuloInterface;
//# sourceMappingURL=articulo.interface.1.js.map