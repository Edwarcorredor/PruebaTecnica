var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
export class inventarios {
    constructor(p1, p2, p3, p4, p5, p6, p7, p8) {
        this.ID_BODEGA = p1;
        this.ID_PRODUCTO = p2;
        this.CANTIDAD = p3;
        this.CREATED_BY = p4;
        this.UPDATE_BY = p5;
        this.CREATED_AT = p6;
        this.UPDATE_AT = p7;
        this.DELETED_AT = p8;
    }
}
__decorate([
    Expose({ name: "id_bodega" }),
    __metadata("design:type", Number)
], inventarios.prototype, "ID_BODEGA", void 0);
__decorate([
    Expose({ name: "id_producto" }),
    __metadata("design:type", Number)
], inventarios.prototype, "ID_PRODUCTO", void 0);
__decorate([
    Expose({ name: "cantidad" }),
    __metadata("design:type", Number)
], inventarios.prototype, "CANTIDAD", void 0);
__decorate([
    Expose({ name: "created_by" }),
    __metadata("design:type", Number)
], inventarios.prototype, "CREATED_BY", void 0);
__decorate([
    Expose({ name: "update_by" }),
    __metadata("design:type", Number)
], inventarios.prototype, "UPDATE_BY", void 0);
__decorate([
    Expose({ name: "created_at" }),
    __metadata("design:type", String)
], inventarios.prototype, "CREATED_AT", void 0);
__decorate([
    Expose({ name: "updated_at" }),
    __metadata("design:type", String)
], inventarios.prototype, "UPDATE_AT", void 0);
__decorate([
    Expose({ name: "deleted_at" }),
    __metadata("design:type", String)
], inventarios.prototype, "DELETED_AT", void 0);
