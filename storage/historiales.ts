import { Type, Transform, Expose } from "class-transformer";

export class historiales{
        /**
    **variables de entrada:
    **cantidad, id_bodega_origen, id_bodega_destino, id_producto, created_by, update_by, updated_at, deleted_at
    */
    @Expose({name: "cantidad"})
    CANTIDAD:number
    @Expose({name: "id_bodega_origen"})
    ID_BODEGA_ORIGEN:number
    @Expose({name: "id_bodega_destino"})
    ID_BODEGA_DESTINO:number
    @Expose({name: "id_producto"})
    ID_PRODUCTO:number
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
    constructor(p1:number, p2:number, p3:number, p4:number, p5:number, p6:number, p7:string, p8:string, p9:string){
        this.CANTIDAD = p1;
        this.ID_BODEGA_ORIGEN = p2;
        this.ID_BODEGA_DESTINO = p3;
        this.ID_PRODUCTO = p4;
        this.CREATED_BY = p5;
        this.UPDATE_BY = p6;
        this.CREATED_AT = p7;
        this.UPDATE_AT = p8;
        this.DELETED_AT = p9;
    }
}