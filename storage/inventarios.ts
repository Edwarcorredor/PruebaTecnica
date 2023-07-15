import { Type, Transform, Expose } from "class-transformer";

export class inventarios{
        /**
    **variables de entrada:
    **id_bodega, id_producto, cantidad, created_by, update_by, updated_at, deleted_at
    */
    @Expose({name: "id_bodega"})
    ID_BODEGA:number
    @Expose({name: "id_producto"})
    ID_PRODUCTO:number
    @Expose({name: "cantidad"})
    CANTIDAD:number
    @Expose({name: "created_by"})
    CREATED_BY:number
    @Expose({name: "update_by"})
    UPDATE_BY:number
    @Expose({name: "created_at"})
    CREATED_AT:string
    @Expose({name: "updated_at"})
    UPDATE_AT:string
    @Expose({name: "deleted_at"})
    DELETED_AT:string
    constructor(p1:number, p2:number, p3:number, p4:number, p5:number, p6:string, p7:string, p8:string){
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